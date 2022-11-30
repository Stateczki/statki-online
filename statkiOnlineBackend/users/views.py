from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from django.views.decorators.csrf import csrf_exempt


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

