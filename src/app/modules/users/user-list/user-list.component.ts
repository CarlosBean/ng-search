import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users = [];
  columns = ['id', 'status', 'username', 'name', 'email', 'website', 'action'];
  openModal = false;
  objectId = null;

  mainSettings = {
    title: 'Create an User',
    footer: 'This component will be for create and update.'
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    }, err => console.error(err));
  }

  getTableAction(event: any) {
    if (event.action === 'edit') {
      this.openModal = true;
      this.objectId = event.data;
      this.mainSettings.title = `Update user ${this.objectId}`;
    } else if (event.action === 'delete') {
      this.delete(event.data);
    }
  }

  delete(id: any) {
    this.userService.delete(id).subscribe(res => {
      alert('DELETE SUCCESS');
    }, err => console.error(err));
  }
}
