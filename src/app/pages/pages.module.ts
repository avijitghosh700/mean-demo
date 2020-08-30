import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    PostCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
  ]
})
export class PagesModule { }
