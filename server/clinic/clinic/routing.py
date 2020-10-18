import channels
from channels.routing import ProtocolTypeRouter
import django
import channels_graphql_ws
import schema

class GraphqlWsConsumer(channels_graphql_ws.GraphqlWsConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""
    schema = schema.schema

    # Uncomment to send keepalive message every 42 seconds.
    # send_keepalive_every = 42

    # Uncomment to process requests sequentially (useful for tests).
    # strict_ordering = True

    async def on_connect(self, payload):
        # print("connected")
        pass

application = channels.routing.ProtocolTypeRouter({
    'websocket': channels.routing.URLRouter([
        django.urls.path('graphql/', GraphqlWsConsumer),
    ])
})