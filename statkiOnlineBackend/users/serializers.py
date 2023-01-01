from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        # fields = ('primary_key', 'username', 'email', 'image')
        fields = ('username', 'email', 'image')
