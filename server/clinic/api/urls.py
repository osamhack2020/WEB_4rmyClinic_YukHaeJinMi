from django.urls import path
from .views import upload_profile
app_name='api'
urlpatterns=[
  path('upload/', upload_profile)
]