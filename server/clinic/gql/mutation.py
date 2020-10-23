from django.contrib.auth import authenticate
from django.utils import timezone
import base64

from graphene import relay, ObjectType, AbstractType, String, Boolean, ID, Field, DateTime, Int, Float, InputObjectType
from graphql import GraphQLError
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.connection.arrayconnection import offset_to_cursor
import graphql_jwt
from graphql_jwt.decorators import login_required
from .auth import ObtainJSONWebToken

from .models import User, Post, Comment, Like, Tag, Counsel, Chat
from .query import UserNode, PostNode, CommentNode, LikeNode, TagNode, PostConnection, CounselNode, CounselChatConnection
from .subscription import MessageSent

from api.models import Image

from graphql_relay.node.node import from_global_id

class UserCreate(relay.ClientIDMutation):
	ok=Boolean()

	class Input:
		email = String(required=True)
		password = String(required=True)
		password_repeat = String(required=True)
		division = String(required=True)
		rank = String(required=True)

	@classmethod
	def mutate(cls, root, info, input):
		if input.password == input.password_repeat:
			try:
				userAlreadyExists = User.objects.filter(email=input.email).exists()
				if not userAlreadyExists:
					_user = User()
					_user.email = input.email
					_user.division = input.division
					_user.rank = input.rank
					_user.set_password(input.password)
					_user.save()

					return UserCreate(ok=True)

				raise GraphQLError("user {email} already exists".format(email=input.email))
			
			except Exception as err:
				raise GraphQLError("CreateUser error : {err}".format(err=err))
		else:
			raise GraphQLError("CreateUser error : Password Incorrect")

class PostCreate(relay.ClientIDMutation):
	post_edge = Field(PostConnection.Edge)

	class Input:
		title = String(required=True)
		content = String(required=True)
		tags = String(required=True)
		is_private = Boolean()
	
	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_user = info.context.user
			_post = Post(user=_user, title=input.title, content=input.content)
			if input.is_private:
				_post.is_private = input.is_private
			_post.save()

			tag_list = input.tags.split()
			for tag in tag_list:
				if '#' in tag:
					tag = tag.replace('#', '')
				tagAlreadyExists = Tag.objects.filter(name=tag).exists()
				if not tagAlreadyExists:
					_tag = Tag(name=tag)
					_tag.save()
					_tag.posts.add(_post)
				else:
					_tag = Tag.objects.get(name=tag)
					_tag.posts.add(_post)
			_post_edge = PostConnection.Edge(cursor = offset_to_cursor(Post.objects.count()), node=_post)
			return PostCreate(post_edge=_post_edge)
		
		except Exception as err:
			raise GraphQLError("PostCreate err : ", err)

class PostUpdate(relay.ClientIDMutation):
	ok=Boolean()
	post=Field(PostNode)

	class Input:
		id = ID(required=True)
		title = String(required=True)
		content = String(required=True)
		tags = String(required=True)

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_post = Post.objects.get(pk=from_global_id(input.id)[1])
			_post.title = input.title
			_post.content = input.content

			# TODO : Tag edit 깔끔하게
			_post.tag_set.all().delete()
			tag_list = input.tags.split()
			for tag in tag_list:
				if '#' in tag:
					tag = tag.replace('#', '')
				tagAlreadyExists = Tag.objects.filter(name=tag).exists()
				if not tagAlreadyExists:
					_tag = Tag(name=tag)
					_tag.save()
					_tag.posts.add(_post)
				else:
					_tag = Tag.objects.get(name=tag)
					_tag.posts.add(_post)

				_post.save()

			return PostUpdate(ok=True, post=_post)
		except Exception as err:
			#raise GraphQLError("post update err : ", err) -> 요거 err이 안뜹니다. 혹시 저만 그런가요?(이준영)
			raise err

class PostDelete(relay.ClientIDMutation):
	ok = Boolean()
	id = ID()
	class Input:
		postId = String(required=True)
	
	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_user = info.context.user
			_postId = from_global_id(input.postId)[1]
			_post = Post.objects.get(id=_postId)

			_post.comment_set.all().delete() # 글이 삭제되면 댓글을 삭제하는 것은 어느정도 당연해보입니다.
			# _post.tag_set.all().delete(), # 하지만 글에 해당하는 태그를 모두 지워버리면, 모든 글에 있는 태그가 사라져버립니다.
			_post.delete()
			
			return PostDelete(ok=True, id = input.postId)
		
		except Exception as err:
			raise GraphQLError("PostDelete err : ", err)


class LikeEdge(ObjectType):
	node = Field(LikeNode)
	cursor = String()

class LikeToggle(relay.ClientIDMutation):
	post = Field(PostNode)

	class Input:
		postId = String(required=True)

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_postId = from_global_id(input.postId)[1]
			_user = info.context.user
			_post = Post.objects.get(id=_postId)
			_like = Like(user=_user, post=_post)

			likeAlreadyExists = Like.objects.filter(user=_user, post=_post).exists()
			if likeAlreadyExists:
				Like.objects.get(user=_user, post=_post).delete()
			else:
				_like.save()
				
			return LikeToggle(post=_post)
		except Exception as err:
			raise GraphQLError('like toggle err : ', err)

class CommentEdge(ObjectType):
	node = Field(CommentNode)
	cursor = String()

class CommentCreate(relay.ClientIDMutation):
	comment_edge = Field(CommentEdge)

	class Input:
		postId = String(required=True)
		content = String(required=True)

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_postId = from_global_id(input.postId)[1]
			_user = info.context.user
			_post = Post.objects.get(id=_postId)
			_comment = Comment(user=_user, post=_post, content=input.content)
			_comment.save()
			_comment_edge = CommentEdge(cursor=offset_to_cursor(Comment.objects.count()), node=_comment)
			print("User: {}, Comment: {}".format(_user.email, _comment.content))
			return CommentCreate(comment_edge=_comment_edge)
		except Exception as err:
			raise GraphQLError(err)

class CommentDelete(relay.ClientIDMutation):
	ok = Boolean()
	id = ID()
	class Input:
		commentId = String(required=True)

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_user = info.context.user
			_commentId = from_global_id(input.commentId)[1]
			_comment = Comment.objects.get(id=_commentId)

			_comment.delete()
			return CommentDelete(ok=True, id=input.commentId)
		except Exception as err:
			raise GraphQLError("CommentDelete err : ", err)


# api.upload_profile 이후에 실행되는 것이 보장되어야 한다.
class UserProfileImgSet(relay.ClientIDMutation):
	ok = Boolean()
	class Input:
		imgUri = String()

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			# TODO : 해당 imgUri 있는지 확인
			
			_user = info.context.user
			_user.imgUri = input.imgUri
			_user.save()
			return UserProfileImgSet(ok=True)
		except Exception as err:
			raise GraphQLError("UserProfileImgSet err : ", err)

class ChatSend(relay.ClientIDMutation):
	chat_edge = Field(CounselChatConnection.Edge)
	class Input:
		counsel_id = ID(required=True)
		content = String(required=True)
	
	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		_counsel = Counsel.objects.get(pk=from_global_id(input.counsel_id)[1])
		_writer = info.context.user
		_chat = Chat(counsel=_counsel, writer=_writer, content=input.content)
		_chat.save()

		counselID = input.counsel_id
		senderID = _writer.id
		MessageSent.announce(counselID, senderID, input.content)
		_chat_edge = CounselChatConnection.Edge(cursor = offset_to_cursor(Chat.objects.count()), node=_chat)
		return ChatSend(chat_edge=_chat_edge)

# TODO : 한사람이 여러 상담사에게 상담을 요청하는 것은 막아야할 필요가 있을 수도 있음
class CounselStart(relay.ClientIDMutation):
	counsel = Field(CounselNode)
	class Input:
		counselor_id = ID(required=True)

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_client = info.context.user
			_counselor = User.objects.get(pk=from_global_id(input.counselor_id)[1])
			_counsel = Counsel(counselor = _counselor, client = _client, status=1)
			_counsel.save()
			return CounselStart(counsel = _counsel)
		except Exception as err:
			raise GraphQLError("counsel start error : ", err)

class CounselStatusUpdate(relay.ClientIDMutation):
	counsel = Field(CounselNode)
	class Input:
		counsel_id = ID(required=True)
		status = Int(required=True) # 0 : 시작 전 ,1 : 진행 중, 2 : 상담 종료

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			_counsel = Counsel.objects.get(pk=from_global_id(input.counsel_id)[1])
			# _counsel.status == input.status 일지라도 우선 그냥 변경
			_counsel.status = input.status
			_counsel.save()
			return CounselStatusUpdate(counsel = _counsel)
		except Exception as err:
			raise GraphQLError("chat status update error : ", err)

class Mutation(AbstractType):
	user_create = UserCreate.Field()
	# user_profile_img_set = UserProfileImgSet.Field()
	post_create = PostCreate.Field()
	post_update = PostUpdate.Field()
	post_delete = PostDelete.Field()

	like_toggle = LikeToggle.Field()
	comment_create = CommentCreate.Field()
	comment_delete = CommentDelete.Field()

	# token 관련 mutation
	auth_token = ObtainJSONWebToken.Field()
	verify_token = graphql_jwt.relay.Verify.Field()
	refresh_token = graphql_jwt.relay.Refresh.Field()
	revoke_token = graphql_jwt.relay.Revoke.Field()
	delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()
	delete_refresh_token_cookie = graphql_jwt.relay.DeleteRefreshTokenCookie.Field()

	# chat 관련 mutation
	chat_send = ChatSend.Field()

	# counsel 관련 mutation
	counsel_start = CounselStart.Field()
	counsel_status_update = CounselStatusUpdate.Field()