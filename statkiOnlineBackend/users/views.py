from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm
from django.views.decorators.csrf import csrf_exempt
from .forms import LoginForm, ProfileUpdateForm
from django.contrib.auth import authenticate, login
from django.utils.safestring import mark_safe
from django.http import JsonResponse
from .serializers import ProfileSerializer, PhotoSerializer
from .models import Profile
from rest_framework.renderers import JSONRenderer
from django.shortcuts import get_object_or_404


@csrf_exempt
def register_request(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, f'Your account has been created! You are now able to log in')
            userName = form.cleaned_data.get('username')
            eMail = form.cleaned_data.get('email')
            Profile.objects.create(username=userName, email=eMail, image='profile_pics/R3.jpg')
            return redirect('login-form')
        else:
            messages.error(request, f'Somethings wrong and I can feel that')
    else:
        form = UserRegisterForm()
    return render(request, 'index.html', {'form': form})


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


@csrf_exempt
@login_required
def change_profile(request):
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, request.FILES,
                                 instance=Profile.objects.get(username=request.user))
        if form.is_valid():
            print("Walid?")
            form.save()
            return redirect("user-homepage")
    return redirect("profile")

@csrf_exempt
@login_required
def photos(request):
    user = get_object_or_404(Profile, username=request.user)
    serializer = PhotoSerializer(user)
    print(serializer.data)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@login_required
def stats(request):
    return render(request, "index.html")
@csrf_exempt
@login_required
def profile(request):
    return render(request, "index.html")
