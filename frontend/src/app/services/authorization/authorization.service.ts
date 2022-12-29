import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {User} from "../../models/user";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8000/ws/';
  }

  register(user: any): Observable<any> {
    const url: string = `${this.baseUrl}register/`;
    return this.http.post<any>(url, user, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    const url: string = `${this.baseUrl}login/`;
    return this.http.post<any>(url, {username: username, password: password}, httpOptions);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  logout(): void {
    const url: string = `${this.baseUrl}logout/`;
    this.http.post(url, null, httpOptions);
    localStorage.removeItem('token');
    localStorage.clear();
  }
}
