from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Director(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    director = models.ForeignKey(Director, on_delete=models.CASCADE)
    description = models.TextField()
    rating = models.FloatField()
    release_date = models.DateField()

    def __str__(self):
        return self.title


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.FloatField()

    def __str__(self):
        return self.review
