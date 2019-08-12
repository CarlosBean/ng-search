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
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
    declarations: [
        TableComponent,
        ModalComponent,
        FormInputComponent,
        DynamicFormComponent,
        DynamicFieldDirective
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        TableComponent,
        ModalComponent,
        DynamicFormComponent,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    entryComponents: [
        FormInputComponent,
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule
        };
    }
}
