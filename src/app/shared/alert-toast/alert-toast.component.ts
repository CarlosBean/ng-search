import { Component, Input } from '@angular/core';
import { ICustomAlert } from 'src/app/models/custom-alert.model';

@Component({
  selector: 'app-alert',
  styleUrls: ['./alert-toast.component.scss'],
  template: `
    <div class="custom-alert" [ngClass]="config.alertType">
      <span class="icon-alert">
          <i class="fas {{ config.icon }} fa-3x fa-fw"></i>
      </span>
      <div class="info-alert">
          <h3>{{ config.title }}</h3>
          <p>{{ config.text }}</p>
      </div>
    </div>
  `
})

export class AlertToastComponent {
  @Input() config: ICustomAlert;
}
