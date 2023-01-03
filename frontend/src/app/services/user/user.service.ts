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
export class UserService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8000/ws/';
  }

  getUser(): Observable<User> {
    const url: string = `${this.baseUrl}user/`;
    return this.http.get<User>(url);
  }

  getUserById(userId: number): Observable<User> {
    const url: string = `${this.baseUrl}user/${userId}/`;
    return this.http.get<User>(url);
  }
}
