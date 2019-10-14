import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config.interface';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';
import { UserService } from '../user-service/user.service';
import { IUser } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  styleUrls: ['./user-update.component.scss'],
  template: `
    <div class="inner-container">
      <h2>Create an User</h2>
      <app-dynamic-form
        [config]="config"
        #form="dynamicForm"
        (submit)="submit($event)">
      </app-dynamic-form>
    </div>
  `
})
export class UserUpdateComponent implements AfterViewInit {

  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;
  user: IUser;
  config: FieldConfig[] = [
    {
      type: 'img',
      label: 'Choose your image',
      name: 'img',
      placeholder: 'Choose your image wisely',
      validation: [Validators.required]
    },
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
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.data.subscribe(({ user }) => this.user = user);
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.updateForm(this.user);
  }

  buildReqBody(): IUser {
    const body: IUser = this.form.value;
    body.id = this.user.id;
    return body;
  }

  submit(value: { [name: string]: any }) {
    if (!this.form.valid) { return; }
    const method = this.user.id ? 'update' : 'update';
    this.userService[method](this.buildReqBody()).subscribe();
  }

  updateForm(user: IUser) {
    this.form.setValue('username', user.username);
    this.form.setValue('name', user.name);
    this.form.setValue('email', user.email);
    this.form.setValue('website', user.website);
  }
}
