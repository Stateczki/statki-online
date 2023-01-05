from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    username = models.CharField(max_length=2137)
    email = models.EmailField()
    image = models.ImageField(default='profilowe.jpg', upload_to='profile_pics')

    def __str__(self):
        return self.username


class adminProfileUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='profilowe.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'
