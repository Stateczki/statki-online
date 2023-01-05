from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
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
def game(request):
    return render(request, "index.html")


