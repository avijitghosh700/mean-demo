import { Injectable } from '@angular/core';
import { Posts } from '../models/posts.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private Post: Posts[] = [];
  private postUpdate = new Subject<Posts[]>();

  constructor() { }

  getPost() {
    return [...this.Post];
  }

  updatePostListener() {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Posts = {
      title,
      content,
    }
    this.Post.push(post);
    this.postUpdate.next([...this.Post]);
  }
}
