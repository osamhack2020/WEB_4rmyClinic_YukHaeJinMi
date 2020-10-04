from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenVerifySerializer

class TokenSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['email'] = user.email
    return token

# verify returns that the token is valid or not (valid : true / not valid: false)
def isValid(token):
  token=token[7:]
  s = TokenVerifySerializer(data={"token": str(token)})
  return s.is_valid()