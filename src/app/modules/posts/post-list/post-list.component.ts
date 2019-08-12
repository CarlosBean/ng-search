import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: any = [];
  columns = ['id', 'userId', 'title', 'body'];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAll().subscribe(res => {
      this.posts = res;
    }, err => console.error(err));
  }
}
