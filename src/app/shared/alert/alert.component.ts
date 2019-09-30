import { Component } from '@angular/core';
import { AlertService } from './alert.service';
import { ICustomAlert } from 'src/app/models/custom-alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  alert: ICustomAlert;
  timeout: any;
  timeClear = 2000;
  show: boolean;

  constructor(private alertService: AlertService) {
    this.alertService.getAlert().subscribe((alert: ICustomAlert) => {
      if (this.alert !== alert) {
        clearTimeout(this.timeout);
      }

      this.alert = alert;
      this.timeout = alert ? setTimeout(() => this.alertService.hide(), this.timeClear) : null;
    });
  }
}
