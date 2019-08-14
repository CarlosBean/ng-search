import { Component, OnInit, ContentChild, TemplateRef, Input, HostListener, Output, EventEmitter } from '@angular/core';

export interface IModalButton {
  name: string;
  action: string;
  class?: string;
}

export interface IModalSettings {
  title: string;
  footer: string;
  buttons: IModalButton[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  @Input() settings: IModalSettings;
  @Output() action = new EventEmitter<any>();
  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

  constructor() { }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.action.emit(false);
  }

  ngOnInit() {
  }

  closeModal() {
    this.action.emit(false);
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
