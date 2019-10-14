import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { AlertBoxService } from 'src/app/shared/alert-box/alert-box.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="main-header">
      <h2>Users List</h2>
      <button routerLink="new">
        Add new (regular route)
      </button>
    </div>

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

  constructor(private userService: UserService, private alertbox: AlertBoxService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(data => this.elementData = data);
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
    this.userService.delete(id).subscribe();
  }
}
