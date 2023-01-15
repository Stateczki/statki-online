from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    username = models.CharField(max_length=2137)
    email = models.EmailField()
    image = models.ImageField(default='R3.jpg', upload_to='profile_pics')
    playerID = models.CharField(default='0000', max_length=8)
    wins = models.PositiveIntegerField(default=0)
    loses = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username


class adminProfileUser(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE)
    image = models.ImageField(default='R3.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'
