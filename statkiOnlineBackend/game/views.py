from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from .models import StatkiRoom
from django.contrib import messages
import re

import logging, traceback

logger = logging.getLogger('django')


@csrf_exempt
def home(request):
    return render(request, 'index.html')


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


@csrf_exempt
@login_required
def room(request):
    return render(request, "index.html")
    # return render(request, '', {"room_name": room_name})

@csrf_exempt
@login_required
def game(request, room_name):
    if not re.match(r'^[\w-]*$', room_name):
        print("Jadupia")
    return render(request, "index.html")
    # return render("game/"+room_name+"/", "index.html")


@csrf_exempt
def roomExist(request, room_name):
    print(room_name)
    return JsonResponse({
        "room_exist": StatkiRoom.objects.filter(room_name=room_name).exists()
    })

@csrf_exempt
def roomsList(request):
    return JsonResponse({
        "rooms": list(StatkiRoom.objects.all().values())
    })


@csrf_exempt
def createRoom(request):
    room_name = request.POST.get('room_name')
    assert room_name != 0
    if StatkiRoom.objects.filter(room_name=room_name).exists():
        messages.error(request, "Such room already exists!")
        return redirect('user-homepage')
    elif len(room_name) > 12:
        messages.error(request, "It's too long!")
        return redirect('user-homepage')
    else:
        StatkiRoom.objects.create(room_name=room_name)
        return redirect('game', room_name)


@csrf_exempt
def joinRoom(request):
    room_name = request.POST.get('room_name')
    print(room_name)
    if StatkiRoom.objects.filter(room_name=room_name).exists():
        return redirect('game', room_name)
    else:
        messages.error(request, "Something went wrong!")
        return redirect('user-homepage')
