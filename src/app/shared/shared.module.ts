import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { FormInputComponent } from './form-input/form-input.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { RouterModule } from '@angular/router';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { ImgPreviewComponent } from './img-preview/img-preview.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { AlertToastComponent } from './alert-toast/alert-toast.component';

@NgModule({
    declarations: [
        TableComponent,
        ModalComponent,
        FormInputComponent,
        FormButtonComponent,
        FormSelectComponent,
        ImgPreviewComponent,
        DynamicFormComponent,
        DynamicFieldDirective,
        AlertToastComponent,
        AlertBoxComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule
    ],
    exports: [
        TableComponent,
        ModalComponent,
        DynamicFormComponent,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AlertToastComponent,
        AlertBoxComponent
    ],
    entryComponents: [
        FormInputComponent,
        FormButtonComponent,
        FormSelectComponent,
        ImgPreviewComponent,
        AlertBoxComponent,
        AlertToastComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
