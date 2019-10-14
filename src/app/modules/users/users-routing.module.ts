import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { IUser, User } from 'src/app/models/user.model';
import { UserService } from './user-service/user.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser> {
    constructor(private service: UserService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
        const id = route.params.id ? route.params.id : null;
        return id ? this.service.getById(id) : of(new User());
    }
}

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        data: { title: 'Users' }
    },
    {
        path: 'new',
        component: UserUpdateComponent,
        resolve: { user: UserResolve },
        data: { title: 'New User' }
    },
    {
        path: 'update/:id',
        component: UserUpdateComponent,
        resolve: { user: UserResolve },
        data: { title: 'Update User' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
