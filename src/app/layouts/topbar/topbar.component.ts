import { Component, OnInit } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @LocalStorage() searchText: string;
  placeholder = '';

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.localStorage.observe('searchPlaceholder').subscribe((columns: string[]) => {
      const aux = [...columns]; // this variable is for avoid bug from local storage service
      this.setPlaceholder(aux);
    });
  }

  setPlaceholder(columns: string[]) {
    if (columns.length > 3) {
      columns = columns.splice(0, 3);
      columns.push('etc...');
    }

    this.placeholder = `Search by ${columns.join(', ')}`;
  }
}
