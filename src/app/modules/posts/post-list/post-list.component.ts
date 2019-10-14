import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-service/post.service';
import { AlertBoxService } from 'src/app/shared/alert-box/alert-box.service';

@Component({
  selector: 'app-post-list',
  template: `
    <div class="main-header">
      <h2>Posts List</h2>
      <button [routerLink]="[{ outlets: { popup: 'new' } }]">
        Add new (route in outlet)
      </button>
    </div>

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

  constructor(private postService: PostService, private alertbox: AlertBoxService) { }

  ngOnInit() {
    this.postService.getAll().subscribe(data => this.elementData = data);
  }

  getTableAction(event: any) {
    switch (event.action) {
      case 'delete':
        this.alertbox.show('Delete Operation', 'Do you want to delete this item?');
        this.alertbox.afterClosed().subscribe(accept => accept && this.delete(event.id));
        break;
    }
  }

  delete(id: any) {
    this.postService.delete(id).subscribe();
  }
}
