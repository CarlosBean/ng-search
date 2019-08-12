import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config.interface';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-user-update',
  styleUrls: ['./user-update.component.scss'],
  template: `
    <div class="inner-container">
      <app-dynamic-form
        [config]="config"
        #form="dynamicForm"
        (submit)="submit($event)">
      </app-dynamic-form>
    </div>
  `
})
export class UserUpdateComponent implements AfterViewInit {

  @Input() objectId: any;

  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Enter your last name',
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

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    this.form.setValue('name', 'Carlos Ben');
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

}
