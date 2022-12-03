from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm,LoginForm
from django.views.decorators.csrf import csrf_exempt
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin


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
            print(username, "    ", password)
            if user is not None:
                print("Jata")
                login(request, user)
                messages.info(request, f"You are now logged in as {login}")
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
def userHomepage(request):
    return render(request, 'index.html')
