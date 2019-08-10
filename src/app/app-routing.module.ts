import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'users',
    // loadChildren: './modules/users/users.module#UsersModule'
    loadChildren: () => import('src/app/modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'posts',
    // loadChildren: './modules/posts/posts.module#PostsModule'
    loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: 'comments',
    // loadChildren: './modules/comments/comments.module#CommentsModule'
    loadChildren: () => import('./modules/comments/comments.module').then(m => m.CommentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
