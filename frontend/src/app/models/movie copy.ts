export class Movie {
  id: number;
  title: string;
  director: number;
  description: string;
  rating: number;
  release_date: string;
  image_url: string;

  constructor(id: number, title: string, director: number, description: string, rating: number, release_date: string, image_url: string) {
    this.id = id;
    this.title = title;
    this.director = director;
    this.description = description;
    this.rating = rating;
    this.release_date = release_date;
    this.image_url = image_url;
  }
}
