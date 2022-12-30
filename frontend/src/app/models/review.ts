export class Review {
  id: number;
  user: number;

  movie: number;
  review: string;

  rating: number;

  constructor(id: number, user: number, movie: number, review: string, rating: number) {
    this.id = id;
    this.user = user;
    this.movie = movie;
    this.review = review;
    this.rating = rating;
  }
}
