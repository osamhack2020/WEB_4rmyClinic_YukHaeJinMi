from graphene import relay, ObjectType, AbstractType, String, Boolean, ID, Field, DateTime, Int, Float, InputObjectType
from graphql import GraphQLError
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.connection.arrayconnection import offset_to_cursor
from .models import User, Post, Comment, Like, Tag
from .query import UserNode, PostNode, CommentNode, LikeNode, TagNode

# from rest_framework_simplejwt.tokens import RefreshToken
from .jwt import TokenSerializer
import requests

class UserEdge(ObjectType):
	node = Field(UserNode)
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
					tokens = TokenSerializer.get_token(_user)
					return CreateUser(user_edge=_user_edge, token=str(tokens.access_token), refresh_token = str(tokens))

				raise GraphQLError("user {email} already exists".format(email=input.email))
			
			except Exception as err:
				raise GraphQLError("CreateUser error : {err}".format(err=err))
		else:
			raise GraphQLError("CreateUser error : Password Incorrect")


class Mutation(AbstractType):
	create_user = CreateUser.Field()