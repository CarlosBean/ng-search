import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-search-table';

  constructor(private localStorage: LocalStorageService) { }

  onActivate() {
    this.localStorage.clear('searchText');
  }
}
