import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {User} from "../../models/user";
import {Token} from "../../models/token";

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

  register(user: User): Observable<Token> {
    const url: string = `${this.baseUrl}register/`;
    return this.http.post<Token>(url, user, httpOptions);
  }

  login(username: string, password: string): Observable<Token> {
    const url: string = `${this.baseUrl}login/`;
    return this.http.post<Token>(url, {username: username, password: password}, httpOptions);
  }

  logout() {
    const token = localStorage.getItem('token') as string;
    localStorage.removeItem('token');
    const url: string = `${this.baseUrl}logout/`;
    return this.http.post(url, token, httpOptions);
  }
}
