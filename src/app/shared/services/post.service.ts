import { Injectable } from '@angular/core';
import { Posts } from '../models/posts.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private Post: Posts[] = [];
  private postUpdate = new Subject<Posts[]>();

  constructor(public http: HttpClient) { }

  getPost() {
    this.http.get(`${environment.url}api/posts`)
    .subscribe(
      (res) => {
        let success = res['success'];

        if (success) {
          this.Post = res['posts'];
          this.postUpdate.next([...this.Post]);
        }
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePostListener() {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Posts = {
      id: null,
      title,
      content,
    }

    this.http.post(`${environment.url}api/create-post`, post)
    .subscribe(
      (res) => {
        let success = res['success'];

        if (success) {
          this.Post.push(post);
          this.postUpdate.next([...this.Post]);
        }

        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
