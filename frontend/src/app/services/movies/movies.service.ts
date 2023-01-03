import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from '../../models/movie';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8000/ws/';
  }

  getMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}movies/default/`;
    return this.http.get<Movie[]>(url);
  }

  getMostReviewedMovies(): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies/reviews/`;
    return this.http.get<Movie[]>(url);
  }

  getRecentMovies(): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies/release_date/`;
    return this.http.get<Movie[]>(url);
  }

  getRandomMovies(): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies/`;
    return this.http.get<Movie[]>(url);
  }

  getTopMovies(): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies/rating/`;
    return this.http.get<Movie[]>(url);
  }

  getMovie(id: number): Observable<Movie> {
    const url: string = `${this.baseUrl}movie/${id}/`;
    return this.http.get<Movie>(url);
  }

  getDirectorMovies(id: number): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies_by_director/${id}/`;
    return this.http.get<Movie[]>(url);
  }

  searchMovies(searchQuery: string): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies/search/${searchQuery}/`;
    return this.http.get<Movie[]>(url);
  }

  addMovie(movie: any): Observable<Movie> {
    const url: string = `${this.baseUrl}movie/`;
    let formData = new FormData();
    formData.append('title', movie.title);
    formData.append('director', movie.director);
    formData.append('description', movie.description);
    formData.append('rating', movie.rating);
    formData.append('release_date', movie.release_date);
    formData.append('image_url', movie.image_url);
    return this.http.post<Movie>(url, formData);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    const url: string = `${this.baseUrl}update_movie/${id}/`;
    let formData = new FormData();
    formData.append('title', movie.title);
    formData.append('director', String(movie.director));
    formData.append('description', movie.description);
    formData.append('rating', String(movie.rating));
    formData.append('release_date', movie.release_date);
    formData.append('image_url', movie.image_url);
    return this.http.post<Movie>(url, formData);
  }

  deleteMovie(id: number): Observable<any> {
    const url: string = `${this.baseUrl}delete_movie/${id}/`;
    return this.http.post<any>(url, httpOptions);
  }
}
