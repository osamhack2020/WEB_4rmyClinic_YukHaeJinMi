from graphene import ID, String, ObjectType
from channels_graphql_ws import Subscription

class MessageSent(Subscription):
  senderID = ID(required=True)
  message = String(required=True)

  class Arguments:
    counselID = ID()
  
  def subscribe(root, info, counselID):
    return [counselID]
  
  def publish(payload, info, counselID):
    return MessageSent(senderID=payload["senderID"], message=payload["message"])
  
  @classmethod
  def announce(cls, counselID, senderID, message):
    cls.broadcast(
      group=counselID,
      payload={"senderID": senderID, "message": message}
    )

class Subscription(ObjectType):
  message_sent = MessageSent.Field()