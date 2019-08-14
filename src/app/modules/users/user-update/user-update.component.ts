import { Component, Input, ViewChild, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config.interface';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-update',
  styleUrls: ['./user-update.component.scss'],
  template: `
  <app-modal [settings]="modalSettings" (action)="getModalAction($event)">
    <ng-template>
      <div class="inner-container">
        <app-dynamic-form
          [config]="config"
          #form="dynamicForm"
          (submit)="submit($event)">
        </app-dynamic-form>
      </div>
    </ng-template>
  </app-modal>
  `
})
export class UserUpdateComponent implements OnInit, AfterViewInit {

  @Input() objectId: any;
  @Output() action = new EventEmitter<any>();
  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;

  modalSettings = {
    title: 'Create an User',
    footer: 'This component will be for create and update.',
    buttons: [
      { name: 'Draft', action: 'draft' },
      { name: 'Save', action: 'save' },
    ]
  };

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Username',
      name: 'username',
      placeholder: 'Enter your username',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your email',
      validation: [Validators.required, Validators.email]
    },
    {
      type: 'input',
      label: 'Website',
      name: 'website',
      placeholder: 'Enter your website',
      validation: [Validators.required, Validators.minLength(4)]
    }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.objectId) {
      this.modalSettings.title = `Update ID ${this.objectId}`;
      this.modalSettings.buttons = [{ name: 'Update', action: 'save' }];
    }
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.updateForm();
    // this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Carlos Ben');
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

  updateForm() {
    if (this.objectId) {
      this.userService.getById(this.objectId).subscribe((user: any) => {
        this.form.setValue('username', user.username);
        this.form.setValue('name', user.name);
        this.form.setValue('email', user.email);
        this.form.setValue('website', user.website);
      }, err => console.error('ERROR ', err));
    }
  }

  getModalAction(event: any) {
    switch (event) {
      case 'save':
        alert('SAVE SUCCESSFUL');
        break;
      case 'draft':
        alert('DRAFT SUCCESSFUL');
        break;
      case 'back':
        alert('BACK SUCCESSFUL');
        break;
      default:
        this.action.emit(event);
        break;
    }
  }

}
