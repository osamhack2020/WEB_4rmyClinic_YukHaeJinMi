from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.utils import timezone

class UserManager(BaseUserManager):
  def create_user(self, email, password=None):
    if not email:
      raise  ValueError('User must have an email address')

    user = self.model(
      email=self.normalize_email(email)
    )

    user.set_password(password)
    user.save(using=self.db)

    return user

  def create_superuser(self, email, password):
    user = self.create_user(email, password)
    user.is_admin = True
    user.save(using=self.db)
    return user
  
class User(AbstractBaseUser):
  EMAIL_FIELD = 'email'
  USERNAME_FIELD = 'email'
  
  email = models.EmailField(verbose_name='email', max_length=255,unique=True)
  imgUri = models.CharField(max_length=200, blank=True)

  DIVISION_CHOICES = [
    ('roka', "육군"),
    ('rokn', "해군"),
    ('rokaf', "공군"),
    ('rokm', "해병대"),
    ('mnd', "국방부직할"),
    ('civil', "민간인")
  ]
  division = models.CharField(max_length=5, choices=DIVISION_CHOICES, default='roka')
  RANK_CHOICES = [
    ('pvt', "이병"), ('pfc', "일병"), ('cpl', "상병"), ('sgt', "병장"),
    ('ssg', "하사"), ('sfc', "중사"), ('msg', "상사"), ('sma', "원사"),
    ('cwo', "준위"), ('slt', "소위"), ('lt', "중위"), ('cpt', "대위"), # 2lt -> slt : second lieutenant
    ('maj', "소령"), ('lcl', "중령"), ('col', "대령"), ('bg', "준장"),
    ('mg', "소장"), ('lg', "중장"), ('gen', "대장"), ('non', "해당사항없음")
  ]
  rank = models.CharField(max_length=3, choices=RANK_CHOICES, default='non')
  is_counselor = models.BooleanField(default=False)

  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  # REQUIRED_FIELDS = ['division', 'rank']

  def __str__(self):
    return "("+self.division+") "+self.email
  def has_perm(self, perm, obj=None):
    return True
  def has_module_perms(self, app_label):
    return True

  @property
  def is_staff(self):
    return self.is_admin

class Post(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=128, blank=False)
  content = models.TextField(blank=False)
  created = models.DateField(default=timezone.now)
  is_private = models.BooleanField(default=False)
  def __str__(self):
    return self.title

class Tag(models.Model):
  posts = models.ManyToManyField(Post)
  name = models.CharField(max_length=20, blank=False)

  def __str__(self):
    return self.name

class Comment(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  content = models.TextField(blank=False)
  created = models.DateField(default=timezone.now)
  is_private = models.BooleanField(default=False)
  def __str__(self):
    return self.content

class Like(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  post = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return "user"+user.pk+" - post"+post.pk