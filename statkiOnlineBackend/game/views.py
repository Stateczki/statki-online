from imaplib import _Authenticator
from multiprocessing import AuthenticationError
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import NewUserForm, LoginForm
from django.contrib import messages

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

import logging, traceback

logger = logging.getLogger('django')


@csrf_exempt
def home(request):
    return render(request, 'index.html')


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


@login_required
def room(request, room_name):
    return render(request, '', {"room_name": room_name})


@login_required
def profile(request):
    pass


def stats(LoginRequiredMixin):
    pass


@csrf_exempt
def login_request(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            login = form.cleaned_data.get('login')
            password = form.cleaned_data.get('password')
            user = authenticate(request, login=login, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {login}")
                return redirect("user-homepage")
            else:
                messages.error(request, "Nie ma takiego usera")
        else:
            messages.error(request, "Nieprawidlowe dane")
    form = LoginForm()
    return render(request, "index.html", {"login_form": form})


@csrf_exempt
def userHomepage(request):
    return render(request, 'index.html')
