import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from './../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, UserUpdateComponent],
})
export class UsersModule { }
