from .consumers import StatkiConsumer, OnlineRoomConsumer
from django.urls import path

websocket_urlpatterns = [
    path('ws/game/<room_name>/', StatkiConsumer.as_asgi(), name="clicked"),
    path('ws/online-rooms/', OnlineRoomConsumer.as_asgi())

]
