"""backend URL Configuration

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
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from knox import views as knox_views

from app import views

schema_view = get_schema_view(
    openapi.Info(
        title="Movie Forum API",
        default_version='v1',
        description="Movie Forum REST API",
    ),
    public=True,
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    # API Documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-schema'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc-schema'),
    # Directors Web Services
    path('ws/directors/', views.director_list, name='director_list'),
    path('ws/director/<int:director_id>/', views.director_detail, name='director_detail'),
    path('ws/director/', views.create_director, name='create_director'),
    path('ws/director/<int:director_id>/', views.update_director, name='update_director'),
    path('ws/director/<int:director_id>/', views.delete_director, name='delete_director'),
    # Movies Web Services
    path('ws/movies/<str:sort_by>/', views.movie_list, name='movie_list'),
    path('ws/movie/<int:movie_id>/', views.movie_detail, name='movie_detail'),
    path('ws/movie/', views.create_movie, name='create_movie'),
    path('ws/movie/<int:movie_id>/', views.update_movie, name='update_movie'),
    path('ws/movie/<int:movie_id>/', views.delete_movie, name='delete_movie'),
    # Reviews Web Services
    path('ws/reviews/<str:sort_by>/', views.review_list, name='review_list'),
    path('ws/review/<int:review_id>/', views.review_detail, name='review_detail'),
    path('ws/review/', views.create_review, name='create_review'),
    path('ws/review/<int:review_id>/', views.delete_review, name='delete_review'),
    # User Web Services
    path('ws/user/', views.user_detail, name='user_detail'),
    path('ws/register/', views.register, name='register'),
    path('ws/login/', views.login, name='knox_login'),
    path('ws/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('ws/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
