from django.contrib.auth import authenticate

from graphene import relay, ObjectType, AbstractType, String, Boolean, ID, Field, DateTime, Int, Float, InputObjectType
from graphql import GraphQLError
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.connection.arrayconnection import offset_to_cursor

from .models import User, Post, Comment, Like, Tag
from .query import UserNode, PostNode, CommentNode, LikeNode, TagNode

from rest.utils import generate_access_token, generate_refresh_token

class UserEdge(ObjectType):
	node = Field(UserNode)
	cursor = String()

class PostEdge(ObjectType):
	node = Field(PostNode)
	cursor = String()

class CreateUser(relay.ClientIDMutation):
	user_edge = Field(UserEdge)
	token = String()
	refresh_token = String()

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
					_user_edge = UserEdge(
						cursor = offset_to_cursor(User.objects.count()), node=_user)
					
					# token 발급
					token = generate_access_token(_user)
					refresh_token = generate_refresh_token(_user)
					print('Welcome, New User: ' + _user.email)
					return CreateUser(user_edge=_user_edge, token=token, refresh_token = refresh_token)

				raise GraphQLError("user {email} already exists".format(email=input.email))
			
			except Exception as err:
				raise GraphQLError("CreateUser error : {err}".format(err=err))
		else:
			raise GraphQLError("CreateUser error : Password Incorrect")

# class Login(relay.ClientIDMutation):
# 	token = String()
# 	refresh_token = String()

# 	class Input:
# 		email = String(required=True)
# 		password = String(required=True)

# 	@classmethod
# 	def mutate(cls, root, info, input):
# 		try:
# 			userExists = User.objects.filter(email=input.email).exists()
# 			if userExists:
# 				_user = User.objects.get(email=input.email)
# 				tokens = TokenSerializer.get_token(_user)
# 				return Login(token=str(tokens.access_token), refresh_token = str(tokens))
# 			else:
# 				raise GraphQLError("User {email} doesn't exists".format(email=input.email))
# 		except Exception as err:
# 			raise GraphQLError("Login error : {err}".format(err=err))


class Mutation(AbstractType):
	create_user = CreateUser.Field()
	# login = Login.Field() 