import channels
from channels.routing import ProtocolTypeRouter
import django
import channels_graphql_ws
import schema

from gql.models import User
from clinic.settings import SECRET_KEY
import jwt
from asgiref.sync import sync_to_async

@sync_to_async
def get_user(email):
    return User.objects.get(email=email)
class GraphqlWsConsumer(channels_graphql_ws.GraphqlWsConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""
    schema = schema.schema

    # Uncomment to send keepalive message every 42 seconds.
    # send_keepalive_every = 42

    # Uncomment to process requests sequentially (useful for tests).
    # strict_ordering = True

    async def on_connect(self, payload):
        # print("connected")
        headers = self.scope['headers']
        cookies = ""
        for header in headers:
            if list(header)[0] ==b'cookie':
                cookies=list(header)[1]
                break
        cookies=str(cookies).split(';')
        token=""
        for cookie in cookies:
            sp =cookie.strip().split('=')
            if sp[0]=="token":
                token=sp[1]
                break
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        email = payload["email"]
        
        # user = User.objects.get(email=email)
        self.scope["user"] = await get_user(email)
        # pass

application = channels.routing.ProtocolTypeRouter({
    'websocket': channels.routing.URLRouter([
        django.urls.path('graphql/', GraphqlWsConsumer),
    ])
})