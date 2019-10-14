import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/models/field-config.interface';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/app/models/field.interface';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.scss']
})
export class ImgPreviewComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  uploadImg = {
    file: null,
    base64: null,
    error: ''
  };

  constructor() { }

  ngOnInit() {
  }

  sendImage($event: any) {
    if ($event && $event.target && $event.target.files[0]) {
      const file = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => this.uploadImg.base64 = reader.result;
    }
  }
}
