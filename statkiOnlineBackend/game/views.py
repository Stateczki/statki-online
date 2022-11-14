from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse


def home(request):
    return render(request,'homepage.tsx')


@login_required
def room(request, room_name):
    return render(request, '', {"room_name": room_name})


@login_required
def profile(request):
    pass


def register(request):
    return render(request,'registrationInterface.tsx')


# def login(request):
#     return render(request,'loggingInterface.tsx')