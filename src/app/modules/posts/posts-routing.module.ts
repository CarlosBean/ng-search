import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostService } from './post-service/post.service';
import { Observable, of } from 'rxjs';
import { Post, IPost } from 'src/app/models/post.model';

@Injectable({ providedIn: 'root' })
export class PostResolve implements Resolve<IPost> {
    constructor(private service: PostService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IPost> {
        const id = route.params.id ? route.params.id : null;
        return id ? this.service.getById(id) : of(new Post());
    }
}

const routes: Routes = [
    {
        path: '',
        component: PostListComponent,
        data: { title: 'Posts List' }
    },
    {
        path: 'new',
        component: PostUpdateComponent,
        resolve: { post: PostResolve },
        outlet: 'popup',
        data: { title: 'New Post' }
    },
    {
        path: 'update/:id',
        component: PostUpdateComponent,
        resolve: { post: PostResolve },
        outlet: 'popup',
        data: { title: 'Update Post' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
