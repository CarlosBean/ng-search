import { Component, OnInit, ContentChild, TemplateRef, Input, HostListener, Output, EventEmitter } from '@angular/core';

export interface ModalSettings {
  title: string;
  footer: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  @Input() settings: ModalSettings;
  @Output() exit = new EventEmitter<boolean>();
  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

  constructor() { }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.exit.emit(false);
  }

  ngOnInit() {
  }

  closeModal() {
    this.exit.emit(false);
    // document.querySelector('#modal').classList.toggle('closed');
    // document.querySelector('#modal-overlay').classList.toggle('closed');
  }
}
