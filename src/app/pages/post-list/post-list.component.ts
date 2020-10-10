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
    this.postService.getPost();
    this.UpdateView();
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  UpdateView() {
    this.postSub = this.postService.updatePostListener()
    .subscribe(
      (res: Posts[]) => {
        this.posts = res;
      }
    );
  }

  DeletePost(postID: string) {
    this.postService.deletePost(postID)
    .subscribe(
      (res) => { 
        console.log(this.posts);
        this.postService.getPost();
        console.log(res, this.posts);
      },
      (error) => console.log(error)
    )
  }
}
