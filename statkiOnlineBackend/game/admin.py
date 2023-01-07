from django.contrib import admin
from .models import StatkiRoom, TrackPlayer


# Register your models here.

class TrackPlayersAdmin(admin.TabularInline):
    model = TrackPlayer


class RoomAdmin(admin.ModelAdmin):
    inlines = [TrackPlayersAdmin, ]


admin.site.register(StatkiRoom)
