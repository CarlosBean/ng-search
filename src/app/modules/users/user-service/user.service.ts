import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = API_URL + 'users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint).pipe(map(res => res, err => err));
  }

  delete(id: any) {
    return this.http.delete(this.endpoint + '/' + id).pipe(map(res => res, err => err));
  }

  getById(id: any) {
    return this.http.get(this.endpoint + '/' + id).pipe(map(res => res, err => err));
  }
}
