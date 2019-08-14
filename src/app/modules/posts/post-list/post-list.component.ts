import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-post-list',
  template: `
    <app-post-update
      [objectId]="objectId"
      (action)="openModal = $event"
      *ngIf="openModal">
    </app-post-update>

    <app-table
      [elementData]="elementData"
      [displayedColumns]="columns"
      (action)="getTableAction($event)">
    </app-table>
  `,
})
export class PostListComponent implements OnInit {

  elementData: any = [];
  columns = ['id', 'title', 'body', 'action'];
  openModal = false;
  objectId = null;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAll().subscribe(res => {
      this.elementData = res;
    }, err => console.error(err));
  }

  getTableAction(event: any) {
    switch (event.action) {
      case 'create':
        this.openModal = true;
        this.objectId = null;
        break;
      case 'edit':
        this.openModal = true;
        this.objectId = event.data;
        break;
      case 'delete':
        this.delete(event.data);
        break;
    }
  }

  delete(id: any) {
    this.postService.delete(id).subscribe(res => {
      alert('DELETE SUCCESS');
    }, err => console.error(err));
  }
}
