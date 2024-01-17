import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BOOKS } from '../mocks/mock-book';
import { USERS } from '../mocks/mock-user';
import { CATEGORIES } from '../mocks/mock-category';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const books = BOOKS
    const users = USERS
    const categories = CATEGORIES
    return {books, users, categories}
  } 
}