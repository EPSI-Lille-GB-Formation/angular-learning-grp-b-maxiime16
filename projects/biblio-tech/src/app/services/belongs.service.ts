import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Belong } from '../models/belong';

@Injectable({
  providedIn: 'root'
})
export class BelongsService {
  apiUrl: string = 'api/belongs';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les id des catégories par rapport au book
  getIdCategoryByIdBook(idBook: number): Observable<number[]> {
    // Faire une requête HTTP pour récupérer les données depuis l'API simulée
    return this.http.get<Belong[]>(`${this.apiUrl}?idBook=${idBook}`)
      .pipe(
        map(belongs => belongs.map(belong => belong.idCategory))
      );
  }
}
