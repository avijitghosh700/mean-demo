import { Injectable } from '@angular/core';
import { Posts } from '../models/posts.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private Post: Posts[] = [];
  public postUpdate = new Subject<Posts[]>();

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
        let id = res['id'];

        if (success) {
          post.id = id;
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

  deletePost(postID: string): Observable<any> {
    return this.http.delete(`${environment.url}api/delete-post/${postID}`);
  }
}
