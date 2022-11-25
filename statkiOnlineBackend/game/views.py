from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
# from .forms import UserRegisterForm
from django.contrib import messages

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse


def home(request):
    return render(request,'index.html')


@login_required
def room(request, room_name):
    return render(request, '', {"room_name": room_name})


@login_required
def profile(request):
    pass


def stats(LoginRequiredMixin,):
    pass

# def register(request):
#     return render(request,'registrationInterface.tsx')


# def register(request):
#     if request.method == 'POST':
#         form = UserRegisterForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             messages.success(request, f'Your account has been created! You are now able to log in')
#             return redirect('login')
#     else:
#         form = UserRegisterForm()
#     return render(request, 'registrationInterface.tsx', {'form': form})

def login(request):
    return render(request,'loggingInterface.tsx')