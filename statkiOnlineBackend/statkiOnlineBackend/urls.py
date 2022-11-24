"""statkiOnlineBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from game import views as game_views
from django.contrib.auth import views as auth_views
# from game.views import ho
# from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', game_views.home, name='statki-home'),
    path('register/', game_views.register.as_view(), name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='loggingInterface.tsx'), name='login'),
    path('lobby', game_views.lobby.as_view(), name='lobby'),
    path('play', game_views.play.as_view(), name='play'),
    path('game<int:gameID>', game_views.game.as_view(), name='game'),
    path('<str:username>/homepage', game_views.home.as_view(), name='user-homepage'),
    path('<str:username>/profile', game_views.home.as_view(), name='user-profile'),
    path('<str:username>/stats', game_views.stats.as_view(), name='user-stats')
    # path('logout/', auth_views.LogoutView.as_view(template_name='loggingInterface.tsx'), name='logout'),
]
