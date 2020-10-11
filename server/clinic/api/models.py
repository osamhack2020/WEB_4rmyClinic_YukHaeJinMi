from django.db import models
from clinic.settings import AUTH_USER_MODEL
from django.utils import timezone

# Create your models here.
class Image(models.Model):
  uploader = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
  img = models.ImageField(upload_to="imgs")
  created = models.DateField(default=timezone.now)