import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostService } from "../../shared/services/post.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  constructor(public postService: PostService) {}

  ngOnInit() {}

  // entertedTitle: any = null;
  // entertedDesc: any = null;

  dataPush(formData: NgForm) {
    if (!formData.valid) return;

    this.postService.addPost(formData.value.title, formData.value.content);
    formData.resetForm();
  }
}
