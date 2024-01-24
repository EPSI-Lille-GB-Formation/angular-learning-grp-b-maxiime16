import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  apiURL: string = 'api/pages';

  constructor(private http: HttpClient) {}

  // méthode pour récupérer la liste des pages
  getPage(): Observable<Page[]> {
    return this.http.get<Page[]>(this.apiURL);
  }

  // méthode pour créer une page
  createPage(newPage: Page): Observable<Page> {
    return this.http.post<Page>(this.apiURL, newPage);
  }

  // méthode pour générer un nouvel id
  genIdPage(collection: Page[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((item) => item.id)) + 1
      : 1;
  }

  // méthode pour récupérer un livre par rapport à l'idBook
  getPageByIdBook(idBook: number): Observable<Page[]> {
    const url = `${this.apiURL}?idBook=${idBook}`;
    return this.http.get<Page[]>(url);
  }

  // méthode pour récupérer une page par son id
  getPageById(id: number): Observable<Page | undefined> {
    const URL = `${this.apiURL}/${id}`;
    return this.http.get<Page | undefined>(URL);
  }

  // méthode pour update un livre
  updatePage(page: Page): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = `${this.apiURL}/${page.id}`;
    return this.http.put(url, page, httpOptions);
  }

  // méthode pour supprimer une page
  deletePage(pageId: number): Observable<void> {
    const URL = `${this.apiURL}/${pageId}`;
    return this.http.delete<void>(URL);
  }
}
