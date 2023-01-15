from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync, sync_to_async
from channels.layers import get_channel_layer
import json
from .models import StatkiRoom, TrackPlayer
from .gameLogic import *
import re


class StatkiConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.url_route = self.scope['url_route']['kwargs']['room_name']
        self.room_name = f'{self.url_route}'
        self.twoPlayer = False
        self.enemyName = ''
        await self.accept()
        print("Liczba graczy w pokoju:  ")
        await self.getUsersInRoom(self.room_name)

    async def receive_json(self, content):
        print("json jedzieeeeeee")
        print(content)

        if content.get("type", None) == 'connect':
            self.sunkCount = 0
            self.userName = content.get("clientId")
            await self.create_players(content.get("clientId"))
            await self.channel_layer.group_add(self.room_name, self.channel_name)

            while not self.twoPlayer:
                await self.sendInfoFullRoom()

            if self.twoPlayer:
                await self.setEnemyName()
                print("EnemyName    ", self.enemyName)
                await self.send_json(({
                    'type': 'enemy',
                    'message': self.enemyName,
                }))

        if content.get("type", None) == 'shot':
            print(self.userName, "       szczał w ", content.get("message", None))

            await self.channel_layer.group_send(
                self.room_name,
                {
                    'type': 'didIHit',
                    'user': self.userName,
                    'message': str(content.get("message", None)),
                },
            )

            # await self.channel_layer.group_send(
            #     self.room_name,
            #     {
            #         "type": "statki_message",
            #         "message": self.userName,
            #     },
            # )

        if content.get("type", None) == 'board':
            self.board = content.get("message")
            if str(self.usersInRoom[0]) == self.userName:
                print("Zaczyna gracz:   ", self.userName)
                await self.send_json(({
                    'type': 'turn'
                }))


    async def didIHit(self, event):
        if str(self.userName) != str(event['user']):
            result = accurate_shot(self.board, event['message'])
            self.outcomeOfShot = result
            await self.channel_layer.group_send(
                self.room_name,
                {
                    'type': 'shot_feedback',
                    'user': self.userName,
                    'message': str(result),
                    'hit_point': event['message']
                },
            )

    async def shot_feedback(self, event):
        shotMessages = ['miss', 'hit', 'hit', '\0']
        if str(self.userName) != str(event['user']):
            print(self.userName, "     ", event['message'])
            if int(event['message']) == 1:
                self.sunkCount += 1
                if self.sunkCount == 20:
                    await self.send_json(({
                        'type': 'win'
                    }))
                    await self.channel_layer.group_send(
                        self.room_name,
                        {
                            "type": "message_looser",
                            "message": self.userName,
                        },
                    )
                await self.send_json(({
                    'type': 'yourshot',
                    'id': event['hit_point'],
                    'result': shotMessages[int(event['message'])],
                }))

                await self.send_json(({
                    'type': 'turn'
                }))
            else:
                await self.send_json(({
                    'type': 'yourshot',
                    'id': event['hit_point'],
                    'result': shotMessages[int(event['message'])],
                }))
                await self.channel_layer.group_send(
                    self.room_name,
                    {
                        "type": "statki_message",
                        "message": self.userName,
                    },
                )

    async def message_looser(self, event):
        if str(self.userName) != str(event['message']):
            await self.send_json(({
                'type': 'lose'
            }))

    async def statki_message(self, event):
        if str(self.userName) != str(event['message']):
            await self.send_json(({
                'type': 'turn'
            }))

    @database_sync_to_async
    def create_players(self, name):
        self.all_players = TrackPlayer.objects.get_or_create \
            (room_name=self.room_name, username=name)

    @sync_to_async
    def sendInfoFullRoom(self):
        if TrackPlayer.objects.filter(room_name=self.room_name).count() == 2:
            self.twoPlayer = True

    @sync_to_async
    def setEnemyName(self):
        for name in self.usersInRoom:
            if str(name) != self.userName:
                self.enemyName = str(name)

    @database_sync_to_async
    def players_count(self):
        print(TrackPlayer.objects.filter(room_name=self.room_name).count())
        # self.all_players_for_room = [x.username for x in self.statki_room.trackplayer_set.all()]
        # self.players_count_all = self.all_players.trackplayer_set.all().count()
        # print(self.players_count_all)

    async def websocket_info(self, event):
        print("websocket_info")
        await self.send_json(({
            'dataset': int(event["dataid"]),
            'user': event["user"],
            'dataid': int(event["datatry"]),
            'command': 'clicked',

        }))

    async def websocket_joined(self, event):
        print("cunt")
        await self.players_count()
        await self.send_json(({
            'command': event["command"],
            'info': event["info"],
            'user': event["user"],
            # 'bingoCount': event.get("bingoCount"),
            "users_count": self.players_count_all,
            "all_players": self.all_players_for_room
        }))

    async def disconnect(self, close_code):
        print("disconnected")
        await self.delete_player()
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "websocket_leave",
                "info": "Someone left room",
            }
        )

    @database_sync_to_async
    def getUsersInRoom(self, room_name):
        self.usersInRoom = TrackPlayer.objects.filter(room_name=room_name)
        print("INFO:   ", self.usersInRoom)

    @database_sync_to_async
    def delete_player(self):
        print(self.usersInRoom)
        for usersInRoom in self.usersInRoom:
            TrackPlayer.objects.get(room_name=self.room_name, username=usersInRoom).delete()
        # players_count = TrackPlayer.objects.filter(room_name=self.room_name).count()
        # if players_count == 0:
        #     StatkiRoom.objects.filter(room_name=self.room_name).delete()

    async def websocket_leave(self, event):
        print("websocket_leave")
        await self.players_count()
        await self.send_json(({
            'command': 'joined',
            'info': event["info"],
            "users_count": self.players_count_all,
            "all_players": self.all_players_for_room

        }))


class OnlineRoomConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self, event):
        print("asss")
        await self.accept()
        self.room_name = 'statki_room'
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        await self.online_room()

        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "websocket_rooms",
                "online_rooms": self.online_rooms

            }
        )

    @database_sync_to_async
    def online_room(self):
        self.online_rooms = [{"room_name": x.room_name, "room_id": f'{x.room_name}-{x.id}'} for x in
                             StatkiRoom.objects.all()]

    async def websocket_rooms(self, event):
        await self.send_json(({
            'command': 'online_rooms',
            "online_rooms": self.online_rooms

        }))

    async def websocket_room_added(self, event):
        await self.send_json(({
            'command': event["command"],
            'room_name': event["room_name"],
            'room_id': event["room_id"],
        }))

    async def websocket_room_deleted(self, event):
        await self.send_json(({
            'command': event["command"],
            'room_name': event["room_name"],
            'room_id': event["room_id"],
        }))

    async def receive_json(self, content, **kwargs):
        return await super().receive_json(content, **kwargs)

    async def disconnect(self, code):
        return await super().disconnect(code)
