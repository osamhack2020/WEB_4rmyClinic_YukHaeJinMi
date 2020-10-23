from graphene import ID, String, ObjectType
from channels_graphql_ws import Subscription
from graphql_jwt.decorators import login_required

class MessageSent(Subscription):
  sender_id = ID()
  content = String()

  class Arguments:
    counsel_id = ID(required=True)
  
  def subscribe(root, info, counsel_id):
    return [counsel_id]
  
  def publish(payload, info, counsel_id):
    # avoid self notification
    if payload["sender_id"] == info.context.user.id:
      return MessageSent.SKIP
      
    return MessageSent(senderID=payload["sender_id"], content=payload["content"])
  
  @classmethod
  def announce(cls, counsel_id, sender_id, content):
    cls.broadcast(
      group=counsel_id,
      payload={"sender_id": sender_id, "content": content}
    )

class Subscription(ObjectType):
  message_sent = MessageSent.Field()