import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Director} from 'src/app/models/director';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

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

  getDirectors(): Observable<Director[]> {
    const url = `${this.baseUrl}directors/`;
    return this.http.get<Director[]>(url);
  }

  addDirector(director: any): Observable<Director> {
    const url = `${this.baseUrl}director/`;
    let formData = new FormData();
    formData.append('name', director.name);
    formData.append('age', director.age);
    formData.append('image_url', director.image_url);
    return this.http.post<Director>(url, formData);
  }

  updateDirector(id: number, director: any): Observable<Director> {
    const url = `${this.baseUrl}update_director/${id}/`;
    let formData = new FormData();
    formData.append('name', director.name);
    formData.append('age', director.age);
    formData.append('image_url', director.image_url);
    console.log(formData)
    return this.http.post<Director>(url, formData);
  }

  deleteDirector(id: number): Observable<any> {
    const url: string = `${this.baseUrl}delete_director/${id}/`;
    return this.http.post<any>(url, httpOptions);
  }

}

