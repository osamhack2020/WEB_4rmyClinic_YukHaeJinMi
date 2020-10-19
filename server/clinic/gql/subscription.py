from graphene import ID, String, ObjectType
from channels_graphql_ws import Subscription
from graphql_jwt.decorators import login_required

class MessageSent(Subscription):
  senderID = ID()
  content = String()

  class Arguments:
    counselID = ID(required=True)
  
  def subscribe(root, info, counselID):
    return [counselID]
  
  def publish(payload, info, counselID):
    # avoid self notification
    if payload["senderID"] == info.context.user.id:
      return MessageSent.SKIP
      
    return MessageSent(senderID=payload["senderID"], content=payload["content"])
  
  @classmethod
  def announce(cls, counselID, senderID, content):
    cls.broadcast(
      group=counselID,
      payload={"senderID": senderID, "content": content}
    )

class Subscription(ObjectType):
  message_sent = MessageSent.Field()