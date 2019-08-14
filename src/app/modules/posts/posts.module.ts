import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostUpdateComponent } from './post-update/post-update.component';

@NgModule({
  declarations: [PostListComponent, PostUpdateComponent],
  imports: [
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
