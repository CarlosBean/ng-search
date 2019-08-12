import { Component, OnInit } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @LocalStorage() searchText: string;
  placeholder: string;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.localStorage.observe('searchPlaceholder').subscribe((columns: string[]) => {
      const aux = [...columns];
      this.setPlaceholder(aux);
    });
  }

  setPlaceholder(columns: string[]) {
    let text = 'Search by ';
    if (columns.length > 3) {
      text += `${columns.splice(0, 3).join(', ')}, etc...`;
    } else {
      text += `${columns.join(', ')}`;
    }
    this.placeholder = text;
  }
}
