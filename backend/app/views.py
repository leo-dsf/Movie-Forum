from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.models import Director, Movie
from app.serializers import DirectorSerializer, MovieSerializer, UserSerializer


# Create your views here.
# Director Web Services
@api_view(['GET'])
def director_list(request):
    """Get all directors"""
    directors = Director.objects.all()
    serializer = DirectorSerializer(directors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def director_detail(request, director_id):
    """Get a director by id"""
    try:
        director = Director.objects.get(id=director_id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DirectorSerializer(director)
    return Response(serializer.data)


@api_view(['POST'])
def create_director(request):
    """Create a director"""
    serializer = DirectorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_director(request, director_id):
    """Update a director"""
    try:
        director = Director.objects.get(id=director_id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DirectorSerializer(director, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_director(request, director_id):
    """Delete a director"""
    try:
        director = Director.objects.get(id=director_id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    director.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# Movie Web Services
@api_view(['GET'])
def movie_list(request, sort_by):
    """Get all movies in certain order"""
    if sort_by == 'default':
        movies = Movie.objects.all()
    else:
        movies = Movie.objects.all().order_by('-' + sort_by)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, movie_id):
    """Get a movie by id"""
    try:
        movie = Movie.objects.get(id=movie_id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST'])
def create_movie(request):
    """Create a movie"""
    serializer = MovieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_movie(request, movie_id):
    """Update a movie"""
    try:
        movie = Movie.objects.get(id=movie_id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = MovieSerializer(movie, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_movie(request, movie_id):
    """Delete a movie"""
    try:
        movie = Movie.objects.get(id=movie_id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    movie.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# User Web Services
@api_view(['POST'])
def register(request):
    """Register a new user"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
