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

from .models import User, Post, Comment, Like, Tag
from .query import UserNode, PostNode, CommentNode, LikeNode, TagNode

from api.models import Image

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

class PostEdge(ObjectType):
	node = Field(PostNode)
	cursor = String()

class PostCreate(relay.ClientIDMutation):
	post_edge = Field(PostEdge)

	class Input:
		title = String(required=True)
		content = String(required=True)
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
			_post_edge = PostEdge(cursor = offset_to_cursor(Post.objects.count()), node=_post)
			return PostCreate(post_edge=_post_edge)
		except Exception as err:
			raise GraphQLError("PostCreate err")

class UserProfileImgSet(relay.ClientIDMutation):
	ok = Boolean()
	class Input:
		filename = String()
		pass

	@classmethod
	@login_required
	def mutate(cls, root, info, input):
		try:
			# context will be the request
			_user = info.context.user
			# imgAlreadyExists = Image.objects.filter(name=input.imgUrl).exists()
			# if not imgAlreadyExists:
			# 악의적인 공격이 아닌 이상, 사용자 이메일에 기반한 파일이름이 생성되었으므로, 이미지 이름이 겹칠 이유는 없다고 가정한다.
			_user.imgUri = "/media/imgs/" + input.filename
			print("@@@@@@@@mutation : ", _user.imgUri)
			_user.save()
			return UploadProfileImage(ok=True)
		except Exception as err:
			raise GraphQLError("UserProfileImgSet err : ", err)

class Mutation(AbstractType):
	user_create = UserCreate.Field()
	user_profile_img_set = UserProfileImgSet.Field()

	post_create = PostCreate.Field()

	# token 관련 mutation
	auth_token = graphql_jwt.relay.ObtainJSONWebToken.Field()
	verify_token = graphql_jwt.relay.Verify.Field()
	refresh_token = graphql_jwt.relay.Refresh.Field()
	revoke_token = graphql_jwt.relay.Revoke.Field()
	delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()
	delete_refresh_token_cookie = graphql_jwt.relay.DeleteRefreshTokenCookie.Field()