from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
import json
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm, LoginForm
from django.views.decorators.csrf import csrf_exempt
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.utils.safestring import mark_safe
from django.core import serializers
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from django.shortcuts import get_object_or_404


@csrf_exempt
def register_request(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login-form')
        else:
            messages.error(request, f'Somethings wrong and I can feel that')
    else:
        form = UserRegisterForm()
    return render(request, 'index.html', {'form': form})


# @login_required
# def profile(request):
#     pass


def stats(LoginRequiredMixin):
    pass


@csrf_exempt
def login_request(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        print(form.errors)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                print("Jata")
                login(request, user)
                messages.info(request, mark_safe(f"You are now logged in as {login}"))
                return redirect("user-homepage")
            else:
                messages.error(request, "Nie ma takiego usera")
                return redirect('login-form')
        else:
            messages.error(request, "Invalid form")
            return redirect('login-form')
    form = LoginForm()
    return render(request, "index.html", {"login_form": form})


@csrf_exempt
@login_required
def userHomepage(request):
    serializer = ProfileSerializer(request.user)
    data = JSONRenderer().render(serializer.data)
    return render(request, "index.html", {"data": data})


@csrf_exempt
@login_required
def user_info(request):
    user = get_object_or_404(Profile, username=request.user)
    serializer = ProfileSerializer(user)
    return JsonResponse(serializer.data, safe=False)



