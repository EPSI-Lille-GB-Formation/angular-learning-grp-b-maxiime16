import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { BookListComponent } from './components/book/book-list.component';
import { BookReadComponent } from './components/book/book-read.component';
import { BookCreateComponent } from './components/book/book-create.component';
import { BookDeleteComponent } from './components/book/book-delete.component';
import { BookEditComponent } from './components/book/book-edit.component';
import { AuthLoginComponent } from './components/authentification/auth-login.component';

export const routes: Routes = [
    {path: '', component: BookListComponent},
    {path: 'book/:id', component: BookReadComponent,  canActivate: [AuthGuard]},
    {path: 'book/delete/:id', component: BookDeleteComponent,  canActivate: [AuthGuard]},
    {path: 'add-book', component: BookCreateComponent,  canActivate: [AuthGuard]},
    {path: 'book/edit/:id', component:BookEditComponent,  canActivate: [AuthGuard]},
    {path: 'login', component:AuthLoginComponent}
];
