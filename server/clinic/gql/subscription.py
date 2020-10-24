from graphene import ID, String, ObjectType, Field
from .query import CounselChatConnection
from .models import Chat, Counsel
from channels_graphql_ws import Subscription
from graphql_jwt.decorators import login_required

from graphql_relay.connection.arrayconnection import offset_to_cursor
from graphql_relay.node.node import from_global_id
from gql.models import User

class MessageSent(Subscription):
  chat_edge = Field(CounselChatConnection.Edge)
  # sender_id = ID()
  # content = String()

  class Arguments:
    counsel_id = ID(required=True)
  
  def subscribe(root, info, counsel_id):
    return [counsel_id]
  

  def publish(payload, info, counsel_id):
    if payload["sender_id"] == info.context.user.id:
      return MessageSent.SKIP

    _counsel = Counsel.objects.get(pk=from_global_id(counsel_id)[1])
    _writer = User.objects.get(pk=payload["sender_id"])
    _chat = Chat(counsel=_counsel, writer=_writer, content=payload["content"])
    _chat_edge = CounselChatConnection.Edge(cursor = offset_to_cursor(Chat.objects.count()), node=_chat)
    return MessageSent(chat_edge=_chat_edge)
  
  @classmethod
  def announce(cls, counsel_id, sender_id, content):
    cls.broadcast(
      group=counsel_id,
      payload={"sender_id": sender_id, "content": content}
    )

class Subscription(ObjectType):
  message_sent = MessageSent.Field()