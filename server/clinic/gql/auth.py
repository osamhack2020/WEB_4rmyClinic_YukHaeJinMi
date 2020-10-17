import graphene
import graphql_jwt
from graphql_jwt.relay import JSONWebTokenMutation, Verify, Refresh, Revoke
from django.contrib.auth import get_user_model
from .query import UserNode

class ObtainJSONWebToken(JSONWebTokenMutation):
    # user_pk = graphene.ID()
    user = graphene.Field(UserNode)
    @classmethod
    def Field(cls, *args, **kwargs):
        cls._meta.arguments['input']._meta.fields.update({
            get_user_model().EMAIL_FIELD:
            graphene.InputField(graphene.String, required=True),
            'password': graphene.InputField(graphene.String, required=True),
        })
        return super().Field(*args, **kwargs)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)
