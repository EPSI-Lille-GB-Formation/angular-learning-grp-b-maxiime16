import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl: string = 'api/books';

  constructor(private http: HttpClient) {}

  // Fonction pour récupérer un livre par son ID
  getBookById(id: number): Observable<Book | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book | undefined>(url);
  }

  // méthode pour récupérer la liste des livres
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Fonction pour créer un nouveau livre
  createBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook);
  }

  // Fonction pour supprimer un livre par son ID
  deleteBook(bookId: number): Observable<void> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<void>(url);
  }

  // Fonction pour mettre à jour un livre
  updateBook(book: Book): Observable<any> {
    // Options HTTP pour spécifier le type de contenu JSON
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    // URL pour mettre à jour le livre avec son ID
    const url = `${this.apiUrl}/${book.id}`;

    // Effectue la requête HTTP de mise à jour en utilisant la méthode PUT
    // Utilise tap() pour effectuer une action (affiche un message dans la console) après la mise à jour
    return this.http
      .put(url, book, httpOptions)
      .pipe(tap(() => console.log(`Livre mis à jour avec l'ID ${book.id}`)));
  }
}