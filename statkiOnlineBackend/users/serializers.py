from rest_framework import serializers
from django.db import models
from .models import Profile
from .validators import validate_file_extension
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('username', 'email', 'image')


class PhotoSerializer(serializers.ModelSerializer):
    icon = models.ImageField('Image', upload_to=os.path.join(BASE_DIR, 'media', 'profile_pics/icon.svg'),
                             validators=[validate_file_extension])

    class Meta:
        model = Profile
        fields = 'image'
