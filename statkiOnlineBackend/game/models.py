from django import forms
from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)


class StatkiRoom(models.Model):
    room_name = models.CharField(max_length=30)

    def __str__(self):
        return self.room_name


class TrackPlayer(models.Model):
    username = models.CharField(max_length=30)
    room = models.ForeignKey(StatkiRoom, on_delete=models.CASCADE)
