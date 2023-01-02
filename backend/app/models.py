from django.contrib.auth.models import User
from django.db import models


# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{instance}/{filename}'.format(instance=type(instance).__name__.lower(), filename=filename.lower())


# Create your models here.
class Director(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    director = models.ForeignKey(Director, on_delete=models.CASCADE)
    description = models.TextField()
    rating = models.FloatField()
    average_rating = models.FloatField()
    release_date = models.DateField()
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Set average_rating to rating if it is not already set
        if not self.average_rating:
            self.average_rating = self.rating
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.FloatField()

    def __str__(self):
        return self.review
