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
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from knox import views as knox_views
from rest_framework import permissions

from app import views
from backend import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Movie Forum API",
        default_version='v1',
        description="Movie Forum REST API",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
                  # Admin
                  path('admin/', admin.site.urls),
                  # API Documentation
                  re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0),
                          name='json-schema'),
                  re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-schema'),
                  re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='redoc-schema'),
                  # Directors Web Services
                  path('ws/directors/', views.director_list, name='director-list'),
                  path('ws/director/<int:director_id>/', views.director_detail, name='director-detail'),
                  path('ws/director/', views.create_director, name='create-director'),
                  path('ws/update_director/<int:director_id>/', views.update_director, name='update-director'),
                  path('ws/delete_director/<int:director_id>/', views.delete_director, name='delete-director'),
                  # Movies Web Services
                  path('ws/movies/<str:sort_by>/', views.movie_list, name='movie-list'),
                  path('ws/movies/', views.random_movies, name='random-movies'),
                  path('ws/movies/search/<str:search_query>/', views.movie_search, name='movie-search'),
                  path('ws/movies_by_director/<int:director_id>/', views.get_movies_by_director,
                       name='movies-by-director'),
                  path('ws/movie/<int:movie_id>/', views.movie_detail, name='movie-detail'),
                  path('ws/movie/', views.create_movie, name='create-movie'),
                  path('ws/update_movie/<int:movie_id>/', views.update_movie, name='update-movie'),
                  path('ws/delete_movie/<int:movie_id>/', views.delete_movie, name='delete-movie'),
                  # Reviews Web Services
                  path('ws/reviews/<int:movie_id>/', views.review_list, name='review-list'),
                  path('ws/review/<int:review_id>/', views.review_detail, name='review-detail'),
                  path('ws/review/', views.create_review, name='create-review'),
                  path('ws/delete_review/<int:review_id>/', views.delete_review, name='delete-review'),
                  # User Web Services
                  path('ws/user/<int:user_id>/', views.get_user, name='get-user'),
                  path('ws/user/', views.user_detail, name='user-detail'),
                  path('ws/register/', views.register, name='register'),
                  path('ws/login/', views.login, name='knox-login'),
                  path('ws/logout/', knox_views.LogoutView.as_view(), name='knox-logout'),
                  path('ws/logoutall/', knox_views.LogoutAllView.as_view(), name='knox-logoutall'),
                  path('ws/update_user/', views.update_user, name='update-user'),
                  path('ws/delete_user/', views.delete_user, name='delete-user'),
              ] + static(settings.IMAGES_URL, document_root=settings.IMAGES_ROOT)
