import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { PagesComponent } from './pages.component';
import { PagesRouting } from './pages-rounting.module'
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRouting,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
  ],
})
export class PagesModule { }
