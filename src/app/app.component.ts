import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private pageTitle: Title
  ) {
    this.getRouteData().subscribe(data => {
      const title = data.title || 'Undefined Title';
      this.pageTitle.setTitle(title);
    });
  }

  onActivate() {
    this.localStorage.clear('searchText');
  }

  getRouteData(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
