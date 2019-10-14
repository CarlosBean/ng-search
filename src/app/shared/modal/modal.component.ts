import { Component, ContentChild, TemplateRef, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';

export interface IModalButton {
  name: string;
  action: string;
  class?: string;
}

export interface IModalSettings {
  title: string;
  footer: string;
  buttons: IModalButton[];
  confirm?: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {

  @Input() settings: IModalSettings;
  @Output() action = new EventEmitter<any>();
  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

  constructor(private router: Router, private alertBox: AlertBoxService) { }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeModal();
  }

  getModuleName(): string {
    return this.router.url.split('/')[1];
  }

  closeModal() {
    if (this.settings.confirm) {
      this.alertBox.show('Are you sure to exit?', 'Your changes will be deleted on exit.');
      this.alertBox.afterClosed().subscribe(accept =>
        accept && this.router.navigate(['/', this.getModuleName(), { outlets: { popup: null } }])
      );
    } else {
      this.router.navigate(['/', this.getModuleName(), { outlets: { popup: null } }]);
    }
  }

  getButtonStyle(button: IModalButton): string {
    const btnActions = {
      draft: 'btn-primary',
      save: 'btn-success',
      back: 'btn-secondary'
    };

    return button.class || btnActions[button.action];
  }

  sendAction(action: string) {
    this.action.emit(action);
  }
}
