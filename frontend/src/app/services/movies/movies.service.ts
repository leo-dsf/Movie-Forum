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
    const url = `${this.baseUrl}movies/`;
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

  getTopMovies(): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies/rating/`;
    return this.http.get<Movie[]>(url);
  }

  getMovie(id: number): Observable<Movie> {
    const url: string = `${this.baseUrl}movies/${id}/`;
    return this.http.get<Movie>(url);
  }

  searchMovies(searchQuery: string): Observable<Movie[]> {
    const url: string = `${this.baseUrl}movies/search/${searchQuery}/`;
    return this.http.get<Movie[]>(url);
  }

  createMovie(movie: Movie): Observable<Movie> {
    const url: string = `${this.baseUrl}movie/`;
    return this.http.post<Movie>(url, movie, httpOptions);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    const url: string = `${this.baseUrl}movie/${movie.id}/`;
    return this.http.put<Movie>(url, movie, httpOptions);
  }

  deleteMovie(id: number): Observable<Movie> {
    const url: string = `${this.baseUrl}movie/${id}/`;
    return this.http.delete<Movie>(url);
  }
}
