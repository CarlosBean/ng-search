import { Component, Input, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config.interface';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';
import { PostService } from '../post-service/post.service';
import { UserService } from '../../users/user-service/user.service';

@Component({
  selector: 'app-post-update',
  styleUrls: ['./post-update.component.scss'],
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
export class PostUpdateComponent implements OnInit, AfterViewInit {

  @Input() objectId: any;
  @Output() action = new EventEmitter<any>();
  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;

  post: any;
  user: any;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Title',
      name: 'title',
      placeholder: 'Enter post title',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Body',
      name: 'body',
      placeholder: 'Enter post body',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Author',
      name: 'author',
      placeholder: 'Enter post author',
      validation: [Validators.required, Validators.minLength(4)]
    }
  ];

  modalSettings = {
    title: 'Create an User',
    footer: 'This component will be for create and update.',
    buttons: [
      { name: 'Draft', action: 'draft' },
      { name: 'Save', action: 'save' },
    ]
  };

  constructor(private postService: PostService, private userService: UserService) { }

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

  updateForm() {
    if (this.objectId) {
      this.postService.getById(this.objectId).subscribe((post: any) => {
        this.userService.getById(post.userId).subscribe((user: any) => {
          this.form.setValue('title', post.title);
          this.form.setValue('body', post.body);
          this.form.setValue('author', user.name);
        }, err => console.error('ERROR ', err));
      }, err => console.error('ERROR ', err));
    }
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
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
