import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  entertedValue: any = null;
  post: any[] = [];

  dataPush() {
    this.post = [];
    this.post.push(this.entertedValue);
  }
}
