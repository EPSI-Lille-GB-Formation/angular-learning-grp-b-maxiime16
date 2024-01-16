import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl: string = 'api/books'

  constructor(
    private http: HttpClient,
  ) { }

  getBookById(id: number): Observable<Book | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book | undefined>(url);
  }
  
  createBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook);
  }

  deleteBook(bookId: number): Observable<void> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<void>(url);
  }

  updateBook(book: Book): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const url = `${this.apiUrl}/${book.id}`;

    return this.http.put(url, book, httpOptions).pipe(
      tap(() => console.log(`Livre mis à jour avec l'ID ${book.id}`))
    );
  }

}
