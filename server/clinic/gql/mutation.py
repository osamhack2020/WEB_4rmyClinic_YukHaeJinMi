from django.contrib.auth import authenticate

from graphene import relay, ObjectType, AbstractType, String, Boolean, ID, Field, DateTime, Int, Float, InputObjectType
from graphql import GraphQLError
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.connection.arrayconnection import offset_to_cursor
import graphql_jwt
from .auth import ObtainJSONWebToken

from .models import User, Post, Comment, Like, Tag
from .query import UserNode, PostNode, CommentNode, LikeNode, TagNode

class PostEdge(ObjectType):
	node = Field(PostNode)
	cursor = String()

class CreateUser(relay.ClientIDMutation):
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
					
					return CreateUser(ok=True)

				raise GraphQLError("user {email} already exists".format(email=input.email))
			
			except Exception as err:
				raise GraphQLError("CreateUser error : {err}".format(err=err))
		else:
			raise GraphQLError("CreateUser error : Password Incorrect")

class Mutation(AbstractType):
	create_user = CreateUser.Field()

	token_auth = ObtainJSONWebToken.Field()
	verify_token = graphql_jwt.relay.Verify.Field()
	refresh_token = graphql_jwt.relay.Refresh.Field()
	revoke_token = graphql_jwt.relay.Revoke.Field()
	delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()
	delete_refresh_token_cookie = graphql_jwt.relay.DeleteRefreshTokenCookie.Field()