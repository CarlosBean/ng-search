import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ICustomAlert } from 'src/app/models/custom-alert.model';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  config = new Subject<any>();

  iconClasses = {
    success: 'fa-check-circle',
    danger: 'fa-times-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle',
  };

  show(alert: ICustomAlert) {
    alert.icon = this.iconClasses[alert.alertType];
    this.config.next(alert);
  }

  hide() {
    this.config.next(null);
  }

  getAlert(): Observable<any> {
    return this.config.asObservable();
  }
}
