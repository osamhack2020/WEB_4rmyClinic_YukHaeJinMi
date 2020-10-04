from graphene import relay, ObjectType, AbstractType, String, Boolean, ID, Field, DateTime, Int, Float, InputObjectType
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.connection.arrayconnection import offset_to_cursor
from .models import User, Post, Comment, Like, Tag
from .query import UserNode, PostNode, CommentNode, LikeNode, TagNode

class UserEdge(ObjectType):
	node = Field(UserNode)
	cursor = String()

class CreateUser(relay.ClientIDMutation):
	ok = Boolean()
	user_edge = Field(UserEdge)

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
				_user = User()
				_user.email = input.email
				_user.division = input.division
				_user.rank = input.rank
				_user.set_password(input.password)
				_user.save()
				_user_edge = UserEdge(
					cursor = offset_to_cursor(User.objects.count()), node=_user)
				return CreateUser(user_edge=_user_edge, ok=True)
			except Exception as err:
				print("CreateUser error : ", err)
				return CreateUser(user_edge=None, ok=False)
		else:
			print("CreateUser error : Password Incorrect")
			return CreateUser(user_edge=None, ok=False)


class Mutation(AbstractType):
	create_user = CreateUser.Field()