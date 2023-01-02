import random

from django.contrib.auth.models import User
from django.db.models import Count
from knox.models import AuthToken
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from app.models import Director, Movie, Review
from app.serializers import DirectorSerializer, MovieSerializer, ReviewSerializer, RegisterSerializer, LoginSerializer, \
    UserSerializer


# Create your views here.
# Director Web Services
@api_view(['GET'])
@permission_classes([AllowAny])
def director_list(request):
    """Get all directors"""
    directors = Director.objects.all()
    serializer = DirectorSerializer(directors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def director_detail(request, director_id):
    """Get a director by id"""
    try:
        director = Director.objects.get(id=director_id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DirectorSerializer(director)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_director(request):
    """Create a director"""
    if request.user.is_superuser:
        serializer = DirectorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_director(request, director_id):
    """Update a director"""
    if request.user.is_superuser:
        try:
            director = Director.objects.get(id=director_id)
        except Director.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DirectorSerializer(director, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_director(request, director_id):
    """Delete a director"""
    if request.user.is_superuser:
        try:
            director = Director.objects.get(id=director_id)
        except Director.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        director.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


# Movie Web Services
@api_view(['GET'])
@permission_classes([AllowAny])
def movie_list(request, sort_by):
    """Get all movies in certain order"""
    if sort_by == 'default':
        movies = Movie.objects.all()
    elif sort_by == 'reviews':
        movies = Movie.objects.annotate(num_reviews=Count('review')).order_by('-num_reviews')
    elif sort_by == 'rating':
        movies = Movie.objects.order_by('-average_rating')
    else:
        movies = Movie.objects.all().order_by('-' + sort_by)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def random_movies(request):
    """Get 5 random movies"""
    movies = random.sample(list(Movie.objects.all()), 5)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def movie_search(request, search_query):
    """Search for a movie by title"""
    movies = Movie.objects.filter(title__icontains=search_query)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def movie_detail(request, movie_id):
    """Get a movie by id"""
    try:
        movie = Movie.objects.get(id=movie_id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_movies_by_director(request, director_id):
    """Get all movies by a director"""
    try:
        director = Director.objects.get(id=director_id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    movies = Movie.objects.filter(director=director)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_movie(request):
    """Create a movie"""
    if request.user.is_superuser:
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_movie(request, movie_id):
    """Update a movie"""
    if request.user.is_superuser:
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_movie(request, movie_id):
    """Delete a movie"""
    if request.user.is_superuser:
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_403_FORBIDDEN)


# Review Web Services
@api_view(['GET'])
@permission_classes([AllowAny])
def review_list(request, movie_id):
    """Get all reviews for a movie"""
    try:
        reviews = Review.objects.filter(movie_id=movie_id)
    except Review.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def review_detail(request, review_id):
    """Get a review by id"""
    try:
        review = Review.objects.get(id=review_id)
    except Review.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewSerializer(review)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request):
    """Create a review"""
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # Update average rating for movie
        movie = Movie.objects.get(id=request.data['movie'])
        reviews = Review.objects.filter(movie=movie)
        movie.average_rating = sum([review.rating for review in reviews]) / len(reviews)
        movie.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_review(request, review_id):
    """Delete a review"""
    try:
        review = Review.objects.get(id=review_id)
    except Review.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if review.user != request.user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    review.delete()
    # Update average rating for movie
    movie = Movie.objects.get(id=review.movie.id)
    reviews = Review.objects.filter(movie=movie)
    if len(reviews) > 0:
        movie.average_rating = sum([review.rating for review in reviews]) / len(reviews)
    else:
        movie.average_rating = movie.rating
    movie.save()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user(request, user_id):
    """Get a user by id"""
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response(serializer.data)


# User Web Services
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    """Get the user"""
    serliazer = UserSerializer(request.user)
    return Response(serliazer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Register a new user"""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'token': AuthToken.objects.create(user)[1]},
                        status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Login a user"""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        return Response({'token': AuthToken.objects.create(user)[1]},
                        status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user(request):
    """Update a user"""
    serializer = UserSerializer(request.user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    """Delete a user"""
    request.user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
