import { Injectable } from '@angular/core';

import { BOOKS } from '../mocks/mock-book';
import { USERS } from '../mocks/mock-user';
import { CATEGORIES } from '../mocks/mock-category';
import { BELONGS } from '../mocks/mock-belong';
import { PAGES } from '../mocks/mock-page';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb(){
    const books = BOOKS
    const users = USERS
    const categories = CATEGORIES
    const belongs = BELONGS
    const pages = PAGES
    return {books, users, categories, belongs, pages}
  }
}
