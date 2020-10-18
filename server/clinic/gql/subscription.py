from graphene import ID, String, ObjectType
from channels_graphql_ws import Subscription

class MessageSent(Subscription):
  senderID = ID()
  message = String()

  class Arguments:
    counselID = ID(required=True)
  
  def subscribe(root, info, counselID):
    print("subscribed group id : ",counselID)
    return [counselID]
  
  def publish(payload, info, counselID):
    return MessageSent(senderID=payload["senderID"], content=payload["content"])
  
  @classmethod
  def announce(cls, counselID, senderID, content):
    print("announce!! : ",counselID, senderID, content)
    cls.broadcast(
      group=counselID,
      payload={"senderID": senderID, "content": content}
    )

class Subscription(ObjectType):
  message_sent = MessageSent.Field()