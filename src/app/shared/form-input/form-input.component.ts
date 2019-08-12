import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/field.interface';
import { FieldConfig } from 'src/app/models/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  styleUrls: ['./form-input.component.scss'],
  template: `
  <mat-form-field [formGroup]="group" class="full-width">
    <mat-label>{{ config.label }}</mat-label>
    <input matInput [placeholder]="config.placeholder"
    [formControlName]="config.name">

    <mat-error *ngIf="group.get(config.name).errors?.required">
      {{ config.label }} is <strong>required</strong>
    </mat-error>

    <mat-error *ngIf="group.get(config.name).errors?.email">
      Invalid email address
    </mat-error>

    <mat-error *ngIf="group.get(config.name).errors?.minlength">
      {{ config.label }} must have at least 4 characters
    </mat-error>

  </mat-form-field>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
