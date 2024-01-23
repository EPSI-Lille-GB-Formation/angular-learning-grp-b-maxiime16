import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiURL: string = 'api/books';

  constructor(
    private http: HttpClient,
  ) { }

  private genId(collection: any[]): number {
    return collection.length > 0 ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
  }

  // méthode pour récupérer la liste des livres
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }

  getBookById(id: number): Observable<Book | undefined> {
    const URL = `${this.apiURL}/${id}`;
    return this.http.get<Book | undefined>(URL);
  }

  deleteBook(bookId: number): Observable<void> {
    const URL = `${this.apiURL}/${bookId}`;
    return this.http.delete<void>(URL);
  }
}
