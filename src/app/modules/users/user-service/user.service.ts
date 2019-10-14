import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = API_URL + 'users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  delete(id: any) {
    return this.http.delete(this.endpoint + '/' + id);
  }

  getById(id: any) {
    return this.http.get(this.endpoint + '/' + id);
  }

  create(post: IUser) {
    return this.http.post(this.endpoint, post);
  }

  update(post: IUser) {
    return this.http.put(`${this.endpoint}/${post.id}`, post);
  }
}
