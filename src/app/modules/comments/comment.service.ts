import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  endpoint = API_URL + 'comments';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint).pipe(map(res => res, err => err));
  }
}
