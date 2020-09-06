import { Component, OnInit} from '@angular/core';
import { Posts } from 'src/app/shared/models/posts.model';
import { PostService } from 'src/app/shared/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Posts[] = [];
  postSub = new Subscription();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPost();
    
    this.postSub = this.postService.updatePostListener()
    .subscribe(
      (res: Posts[]) => {
        this.posts = res;
        console.log(res);
      }
    );
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
