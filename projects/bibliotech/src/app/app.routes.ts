import { Routes } from '@angular/router';
import { BookListComponent } from './components/books/book-list/book-list.component';
import { BookCreateComponent } from './components/books/book-create/book-create.component';
import { BookReadComponent } from './components/books/book-read/book-read.component';
import { BookUpdateComponent } from './components/books/book-update/book-update.component';
import { BookDeleteComponent } from './components/books/book-delete/book-delete.component';

export const routes: Routes = [
    {path: '', component: BookListComponent},
    {path: 'book/create', component: BookCreateComponent},
    {path: 'book/:id', component: BookReadComponent},
    {path: 'book/update/:id', component: BookUpdateComponent},
    {path: 'book/delete/:id', component: BookDeleteComponent},
];
