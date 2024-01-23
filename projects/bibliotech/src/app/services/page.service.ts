import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  apiURL: string = 'api/pages';

  constructor(
    private http: HttpClient,
  ) { }

  getPageByIdBook(idBook: number): Observable<Page[]> {
    const url = `${this.apiURL}?idBook=${idBook}`;
    return this.http.get<Page[]>(url);
  }

  
}
