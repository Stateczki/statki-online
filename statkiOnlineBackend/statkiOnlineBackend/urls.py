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
from django.urls import path, re_path, include
from game import views as game_views
from users import views as user_views
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings

# from game.views import ho
# from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', auth_views.LoginView.as_view(template_name='index.html'), name='login-form'),
    path('login/', user_views.login_request, name='logingIn'),
    path('logout/', auth_views.LogoutView.as_view(template_name='index.html'), name='logout'),
    path('register/', user_views.register_request, name='register'),
    path('homepage/', user_views.userHomepage, name='user-homepage'),
    path('userInfo/', user_views.user_info, name='user-info'),
    path('ping/', game_views.ping),
    # path('game/', game_views.game, name='game'),

    # TO BE CHECKED
    path('game/allRooms/', game_views.roomsList, name='roomsList' ),
    path('game/<str:room_name>/', game_views.game, name='game'),
    # MAKE THOSE 2 REDIRECT TO THE UPPER METHOD
    path('homepage/createRoom/', game_views.createRoom, name='createRoom'),
    path('homepage/joinRoom/', game_views.joinRoom, name='joinRoom'),

    # re_path(r'^api/profiles/$', user_views.user_info),
    # path('lobby', game_views.lobby.as_view(), name='lobby'),
    # path('play', game_views.play.as_view(), name='play'),
    # path('game<int:gameID>', game_views.game.as_view(), name='game'),
    # path('<str:username>/stats', game_views.stats.as_view(), name='user-stats')
    # path('logout/', auth_views.LogoutView.as_view(template_name='loggingInterface.tsx'), name='logout'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
