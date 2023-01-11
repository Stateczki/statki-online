from .consumers import StatkiConsumer, OnlineRoomConsumer
from django.urls import path, re_path

websocket_urlpatterns = [
    path('ws/online-rooms/', OnlineRoomConsumer.as_asgi()),
    re_path(r'ws/game/(?P<room_name>\w+)/$', StatkiConsumer.as_asgi(), name="clicked"),
]
