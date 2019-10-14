import { Component, Input, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config.interface';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';
import { PostService } from '../post-service/post.service';
import { IPost } from 'src/app/models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-update',
  styleUrls: ['./post-update.component.scss'],
  template: `
    <app-modal [settings]="modalSettings" (action)="getModalAction($event)">
      <ng-template>
        <div class="inner-container">
          <app-dynamic-form
            [config]="config"
            #form="dynamicForm">
          </app-dynamic-form>
        </div>
      </ng-template>
    </app-modal>
  `
})
export class PostUpdateComponent implements OnInit, AfterViewInit {

  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;

  post: IPost;
  config: FieldConfig[] = [
    {
      type: 'input', label: 'Title', name: 'title',
      placeholder: 'Enter post title',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input', label: 'Body', name: 'body',
      placeholder: 'Enter post body',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input', label: 'Author', name: 'author',
      placeholder: 'Enter post author',
      validation: [Validators.required, Validators.minLength(4)]
    }
  ];

  modalSettings = {
    title: 'Create a Post',
    footer: 'This component will be used for create and update.',
    buttons: [
      { name: 'Draft', action: 'draft' },
      { name: 'Save', action: 'save' },
    ],
    confirm: true
  };

  constructor(private route: ActivatedRoute, public postService: PostService) {
    this.route.data.subscribe(({ post }) => this.post = post);
  }

  ngOnInit(): void {
    if (this.post.id) {
      this.modalSettings.title = `Update ID ${this.post.id}`;
      this.modalSettings.buttons = [{ name: 'Update', action: 'save' }];
    }
  }

  ngAfterViewInit() {
    this.updateForm(this.post);
  }

  updateForm(post: IPost) {
    this.form.setValue('title', post.title);
    this.form.setValue('body', post.body);
    this.form.setValue('author', post.userId);
  }

  buildReqBody(): IPost {
    const body: IPost = this.form.value;
    body.id = this.post.id;
    return body;
  }

  save() {
    if (!this.form.valid) { return; }
    const method = this.post.id ? 'update' : 'update';
    this.postService[method](this.buildReqBody()).subscribe();
  }

  getModalAction(event: any) {
    switch (event) {
      case 'save': this.save(); break;
      case 'draft': console.log('DRAFT SUCCESSFUL'); break;
    }
  }
}
