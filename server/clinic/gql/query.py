from graphene import relay, ObjectType, String, Field, Int, Boolean
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from graphql_relay import from_global_id

from django.db.models import Q, Count
from .models import User, Post, Comment, Like, Tag, Counsel, Chat

from api.models import Image

from graphql_jwt.decorators import login_required

class UserNode(DjangoObjectType):
  class Meta:
    model = User
    interfaces = (relay.Node,)
    exclude = ("is_admin", "password", "is_active") # , "counsel_counselor", "counsel_client"
    filter_fields = {
      'email': ['icontains'],
      'division': ['icontains'],
      'rank': ['icontains'],
      'is_counselor': ['exact']
    }

class PostNode(DjangoObjectType):
  likes = Int()
  viewer_already_liked = Boolean()
  viewer_can_edit_post = Boolean()
  class Meta:
    model = Post
    interfaces = (relay.Node,)
    filter_fields = {
      'created': ['gte', 'lte'],
      'title': ['icontains'],
      'content': ['icontains'],
    }
  
  def resolve_likes(parent, info):
    return Post.objects.get(pk=parent.pk).like_set.count()

  @login_required
  def resolve_viewer_already_liked(parent, info):
    _user = info.context.user
    _post = Post.objects.get(pk=parent.pk)
    return Like.objects.filter(user=_user, post=_post).exists()

  @login_required
  def resolve_viewer_can_edit_post(parent, info):
    return Post.objects.get(pk=parent.pk).user.id == info.context.user.id
  


class CommentNode(DjangoObjectType):
  viewer_can_edit_comment = Boolean()
  class Meta:
    model = Comment
    interfaces = (relay.Node,)
  
  @login_required
  def resolve_viewer_can_edit_comment(parent, info):
    return Comment.objects.get(pk=parent.pk).user.id == info.context.user.id

class LikeNode(DjangoObjectType):
  class Meta:
    model = Like
    interfaces = (relay.Node,)

class TagNode(DjangoObjectType):
  class Meta:
    model = Tag
    interfaces = (relay.Node,)
    filter_fields = {
      'name': ['icontains'],
    }

class ChatNode(DjangoObjectType):
  class Meta:
    model=Chat
    interfaces = (relay.Node, )

class CounselChatConnection(relay.Connection):
  class Meta:
    node = ChatNode

class CounselNode(DjangoObjectType):
  class Meta:
    model=Counsel
    interfaces = (relay.Node, )

class TagConnection(relay.Connection):
  class Meta:
    node = TagNode

class PostConnection(relay.Connection):
  class Meta:
    node = PostNode

class CounselorConnection(relay.Connection):
  class Meta:
    node = UserNode

class Query(ObjectType):
  node = relay.Node.Field()
  user = relay.Node.Field(UserNode)
  post = relay.Node.Field(PostNode)
  tag = relay.Node.Field(TagNode)
  counsel = relay.Node.Field(CounselNode)
  chat = relay.Node.Field(ChatNode)

  users = DjangoFilterConnectionField(UserNode) # TODO : delete this field

  ############### CUSTOM CONNECTIONS ###############
  tags = relay.ConnectionField(TagConnection, name__icontains=String())
  def resolve_tags(parent, info, first=None, after=None, name__icontains=""):
    tags = Tag.objects.filter(name__icontains=name__icontains)
    return tags

  posts = relay.ConnectionField(PostConnection)
  def resolve_posts(parent, info, first=None, after=None):
    # 상담사만이 비밀글을 볼 수 있다.
    try:
      hasPerm = info.context.user.is_counselor
      if hasPerm:
        posts = Post.objects.all()
        return posts
        
      # 공개되어있는 글이거나 자신이 쓴 글만 볼 수 있도록 한다.
      posts = Post.objects.filter(Q(is_private__exact=False) | Q(user_id__exact=info.context.user.id))
      return posts
    except Exception as err:
      print("resolve posts err : ",err)
      return None

  counselors = relay.ConnectionField(CounselorConnection)
  def resolve_counselors(parent, info):
    counselors = User.objects.filter(is_counselor=True)
    return counselors

  get_user_from_email = Field(UserNode, email=String(required=True))
  @login_required
  def resolve_get_user_from_email(parent, info, email):
    user = User.objects.get_by_natural_key(email)
    return user

  