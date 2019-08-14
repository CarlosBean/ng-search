import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <app-user-update
      [objectId]="objectId"
      (action)="openModal = $event"
      *ngIf="openModal">
    </app-user-update>

    <app-table
      [elementData]="elementData"
      [displayedColumns]="columns"
      (action)="getTableAction($event)">
    </app-table>
  `,
})
export class UserListComponent implements OnInit {

  elementData = [];
  columns = ['id', 'status', 'username', 'name', 'email', 'website', 'action'];
  openModal = false;
  objectId = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(res => {
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
    this.userService.delete(id).subscribe(res => {
      alert('DELETE SUCCESS');
    }, err => console.error(err));
  }
}
