import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  endpoint = API_URL + 'posts';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  delete(id: any) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  getById(id: any) {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  create(post: IPost) {
    return this.http.post(this.endpoint, post);
  }

  update(post: IPost) {
    return this.http.put(`${this.endpoint}/${post.id}`, post);
  }
}
