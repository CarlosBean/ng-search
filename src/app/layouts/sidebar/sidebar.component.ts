import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isNull } from 'util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus = [
    {
      title: 'First Menu', icon: 'fas fa-user', toggled: true,
      submenu: [
        { title: 'Users', route: 'users' },
        { title: 'Posts', route: 'posts' }
      ]
    },
    {
      title: 'Second Menu', icon: 'fas fa-comment', toggled: false,
      submenu: [
        { title: 'Comments', route: 'comments' },
        { title: 'Stadistics', route: 'stadistics' },
      ]
    },
    {
      title: 'Third Menu', icon: 'fas fa-camera', toggled: false,
      submenu: [
        { title: 'Gallery', route: 'gallery' },
        { title: 'Personal', route: 'personal' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  chooseMenu(index: number) {
    this.menus.forEach(e => {
      e.toggled = e.title === this.menus[index].title ? !e.toggled : false;
    });
  }

  /* With vanilla javascript
  *
  chooseMenu(current: any, index: number) {
    const lastopen = this.document.querySelector('#sidebar > li > ul.open');

    switch (lastopen) {
      case null:
        current.classList.add('open'); break;
      case current:
        current.classList.remove('open'); break;
      default:
        current.classList.add('open');
        lastopen.classList.remove('open'); break;
    }
  } */
}
