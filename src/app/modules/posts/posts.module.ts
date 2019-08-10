import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PostListComponent],
  imports: [
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
