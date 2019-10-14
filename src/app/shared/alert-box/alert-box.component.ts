import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { ICustomAlert } from 'src/app/models/custom-alert.model';

@Component({
  selector: 'app-alert-box',
  template: `
    <div class="modal" role="dialog">
      <div class="modal-body">
          <h2>{{ config.title }}</h2>
          <p class="m-0 mb-1 text-center">{{ config.text }}</p>
      </div>
      <div class="modal-footer">
          <button class="btn-info" (click)="closed.next(false)">Cancel</button>
          <button class="btn-success" (click)="closed.next(true)">Accept</button>
      </div>
    </div>
    <div class="modal-overlay"></div>
  `,
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {
  @Input() config: ICustomAlert;
  @Output() closed = new EventEmitter();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closed.next(false);
  }
}
