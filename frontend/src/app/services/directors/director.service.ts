import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Director } from 'src/app/models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8000/ws/';
  }  
 
  getDirector(id: number): Observable<Director> {
    const url: string = `${this.baseUrl}director/${id}/`;
    return this.http.get<Director>(url);
  }
}

