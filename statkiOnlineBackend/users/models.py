from django.db import models
from django.contrib.auth.models import User


class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
