import { Routes } from '@angular/router';

import { BookListComponent } from './components/books/book-list/book-list.component';
import { BookCreateComponent } from './components/books/book-create/book-create.component';
import { BookReadComponent } from './components/books/book-read/book-read.component';
import { BookUpdateComponent } from './components/books/book-update/book-update.component';
import { BookDeleteComponent } from './components/books/book-delete/book-delete.component';

import { PageCreateComponent } from './components/pages/page-create/page-create.component';
import { PageReadComponent } from './components/pages/page-read/page-read.component';
import { PageUpdateComponent } from './components/pages/page-update/page-update.component';
import { PageDeleteComponent } from './components/pages/page-delete/page-delete.component';

import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoriesCreateComponent } from './components/categories/categories-create/categories-create.component';
import { CategoriesUpdateComponent } from './components/categories/categories-update/categories-update.component';
import { CategoriesDeleteComponent } from './components/categories/categories-delete/categories-delete.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },

  { path: 'book/create', component: BookCreateComponent },
  { path: 'book/:idBook', component: BookReadComponent },
  { path: 'book/update/:idBook', component: BookUpdateComponent },
  { path: 'book/delete/:idBook', component: BookDeleteComponent },

  { path: 'book/:idBook/create', component: PageCreateComponent },
  { path: 'book/:idBook/page/:idPage', component: PageReadComponent },
  { path: 'book/:idBook/page/update/:idPage', component: PageUpdateComponent },
  { path: 'book/:idBook/page/delete/:idPage', component: PageDeleteComponent },

  { path: 'categories', component: CategoriesListComponent },
  { path: 'categories/create', component: CategoriesCreateComponent },
  {
    path: 'categories/update/:idCategory',
    component: CategoriesUpdateComponent,
  },
  {
    path: 'categories/delete/:idCategory',
    component: CategoriesDeleteComponent,
  },
];
