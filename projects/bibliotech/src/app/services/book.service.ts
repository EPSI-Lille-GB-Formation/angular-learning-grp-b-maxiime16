import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiURL: string = 'api/books';

  constructor(private http: HttpClient) {}

  // méthode pour récupérer la liste des livres
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }

  // méthode pour créer un livre
  createBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiURL, newBook);
  }

  // méthode pour générer un nouvel id
  genIdBook(collection: Book[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((item) => item.id)) + 1
      : 1;
  }

  // méthode pour récupérer un livre par son id
  getBookById(id: number): Observable<Book | undefined> {
    const URL = `${this.apiURL}/${id}`;
    return this.http.get<Book | undefined>(URL);
  }

  // méthode pour update un livre
  updateBook(book: Book): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = `${this.apiURL}/${book.id}`;
    return this.http.put(url, book, httpOptions);
  }

  // méthode pour supprimer un livre
  deleteBook(bookId: number): Observable<void> {
    const URL = `${this.apiURL}/${bookId}`;
    return this.http.delete<void>(URL);
  }
}
