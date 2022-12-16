import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { PostService } from "src/app/shared/services/post.service";

import { Posts } from "src/app/shared/models/posts.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit {
  public posts: Posts[] = [];

  private destroy$: Subject<void> = new Subject();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPost();
    this.UpdateView();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  UpdateView() {
    this.postService
      .updatePostListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Posts[]) => {
        this.posts = res;
      });
  }

  DeletePost(postID: string) {
    this.postService
      .deletePost(postID)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          console.log(this.posts);
          this.postService.getPost();
          console.log(res, this.posts);
        },
        (error) => console.log(error)
      );
  }
}
