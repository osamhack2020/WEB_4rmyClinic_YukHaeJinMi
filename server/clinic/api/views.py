from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from clinic.settings import SECRET_KEY

from gql.models import User
from .models import Image

import jwt
# Create your views here.
@csrf_exempt
def upload_profile(request):
  if request.method == 'POST':
    try:
      img=request.FILES["img"]
      token = request.COOKIES["token"]

      payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
      email = payload["email"]
      
      user = User.objects.get(email=email)
      img = Image(uploader=user, img=img)
      img.save()

      print(dir(img.img))
      # print("@@@@", img.img.name)
      user.imgUri = "/media/" + img.img.name
      user.save()

      return JsonResponse({'uploaded': True})
    except Exception as err:
      print(err)
      return JsonResponse({'uploaded': False})
  pass