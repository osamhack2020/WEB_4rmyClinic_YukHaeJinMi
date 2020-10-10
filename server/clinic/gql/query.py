from graphene import relay, ObjectType, String, Field
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import User, Post, Comment, Like, Tag
from api.models import Image

class UserNode(DjangoObjectType):
  class Meta:
    model = User
    interfaces = (relay.Node,)
    exclude = ("is_admin", "password", "is_active")
    filter_fields = {
      'email': ['icontains'],
      'division': ['icontains'],
      'rank': ['icontains'],
    }

class PostNode(DjangoObjectType):
  class Meta:
    model = Post
    interfaces = (relay.Node,)
    filter_fields = {
      'created': ['gte', 'lte'],
      'title': ['icontains'],
      'content': ['icontains'],
    }

class CommentNode(DjangoObjectType):
  class Meta:
    model = Comment
    interfaces = (relay.Node,)

class LikeNode(DjangoObjectType):
  class Meta:
    model = Like
    interfaces = (relay.Node,)

class TagNode(DjangoObjectType):
  class Meta:
    model = Tag
    interfaces = (relay.Node,)

class Query(ObjectType):
  node = relay.Node.Field()
  user = relay.Node.Field(UserNode)
  post = relay.Node.Field(PostNode)
  tag = relay.Node.Field(TagNode)
  
  recent_posts = DjangoFilterConnectionField(PostNode)
  all_users = DjangoFilterConnectionField(UserNode)
