from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    username = models.CharField(max_length=2137, default='jeez')
    email = models.EmailField(default='test@example.com')
    image = models.ImageField(default='profilowe.jpg', upload_to='profile_pics')

    def __str__(self):
        return self.username
