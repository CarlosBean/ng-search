import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  options = {
    users: false,
    posts: false,
    comments: false
  };

  constructor() { }

  ngOnInit() {
  }

  chooseMenu(userOption: string) {
    Object.keys(this.options).forEach(key => {
      this.options[key] = key === userOption ? true : false;
    });
  }
}
