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

import { AuthLoginComponent } from './components/authentification/auth-login/auth-login.component';
import { AuthSigninComponent } from './components/authentification/auth-signin/auth-signin.component';

import { UserReadComponent } from './components/users/user-read/user-read.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';

import { AdminPageComponent } from './components/authentification/admin-page/admin-page.component';
import { AuthGuard } from './guards/authGuard';

import { EasterEggComponent } from './models/easter-egg/easter-egg.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },

  {
    path: 'book/create',
    component: BookCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/:idBook',
    component: BookReadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/update/:idBook',
    component: BookUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/delete/:idBook',
    component: BookDeleteComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'book/:idBook/create',
    component: PageCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/:idBook/page/:idPage',
    component: PageReadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/:idBook/page/update/:idPage',
    component: PageUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/:idBook/page/delete/:idPage',
    component: PageDeleteComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'categories',
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/create',
    component: CategoriesCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/update/:idCategory',
    component: CategoriesUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/delete/:idCategory',
    component: CategoriesDeleteComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: AuthLoginComponent },
  { path: 'sign-in', component: AuthSigninComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },

  {
    path: 'user/:idUser',
    component: UserReadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/delete/:idUser',
    component: UserDeleteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/update/:idUser',
    component: UserUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/create',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
  },

  { path: 'easter-egg', component: EasterEggComponent },
];
