import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8000/ws/';
  }

  getMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}movies/default/`);
  }

  getMostReviewedMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}movies/reviews/`);
  }

  getRecentMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}movies/release_date/`);
  }

  getTopMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}movies/rating/`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/`);
  }

  searchMovies(searchQuery: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movies/search/${searchQuery}/`);
  }
}
