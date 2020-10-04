from .jwt import isValid
from graphql import GraphQLError
class Auth(object):
  def resolve(self, next, root, info, **args):
    # print(dir(info))
    # print(info.operation)
    # operation_type = info.operation.operation
    # if operation_type == "mutation":
    token = info.context.headers["Authorization"]
    # if not isValid(token):
    #   raise GraphQLError("Auth Error")
    return next(root, info, **args)