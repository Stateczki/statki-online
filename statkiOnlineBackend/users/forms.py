from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class LoginForm(forms.ModelForm):
    # username = forms.CharField(label="username", max_length=30)
    # password = forms.CharField(label="password", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password']
