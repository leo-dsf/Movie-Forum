import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Review} from "../../models/review";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8000/ws/';
  }

  getReviews(movieId: number | undefined): Observable<Review[]> {
    const url = `${this.baseUrl}reviews/${movieId}/`;
    return this.http.get<Review[]>(url);
  }

  getReview(id: number): Observable<Review> {
    const url: string = `${this.baseUrl}review/${id}/`;
    return this.http.get<Review>(url);
  }

  createReview(review: Review): Observable<Review> {
    const url: string = `${this.baseUrl}review/`;
    return this.http.post<Review>(url, review, httpOptions);
  }

  deleteReview(id: number): Observable<any> {
    const url: string = `${this.baseUrl}delete_review/${id}/`;
    return this.http.post<any>(url, httpOptions);
  }
}
