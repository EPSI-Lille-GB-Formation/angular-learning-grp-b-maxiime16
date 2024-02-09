import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListComponent } from '../../books/book-list/book-list.component';
import { CategoriesListComponent } from '../../categories/categories-list/categories-list.component';
import { UserListComponent } from '../../users/user-list/user-list.component';
import { PageListComponent } from '../../pages/page-list/page-list.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, CategoriesListComponent, UserListComponent, PageListComponent, BookListComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  
  currentComponent: any;
  UserList = UserListComponent;
  BookList = BookListComponent;
  CategoriesList = CategoriesListComponent;

  constructor() {
    this.currentComponent = UserListComponent;
  }

  changeComponent(component: any): void {
    this.currentComponent = component;
  }
}