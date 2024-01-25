import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map } from 'rxjs';

import { Belong } from '../models/belong';

@Injectable({
  providedIn: 'root',
})
export class BelongService {
  apiUrl: string = 'api/belongs';

  constructor(private http: HttpClient) {}

  // méthode pour récupérer la liste des belongs
  getBelongs(): Observable<Belong[]> {
    return this.http.get<Belong[]>(this.apiUrl);
  }

  // Créer un lien Belong
  createBelong(newBelong: Belong): Observable<Belong> {
    return this.http.post<Belong>(this.apiUrl, newBelong);
  }

  // méthode pour générer un nouvel id
  genIdBelong(collection: Belong[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((item) => item.id)) + 1
      : 1;
  }

  // Récupère la liste d'ID de catégories en fonction de l'ID du livre
  getIdCategoryByIdBook(idBook: number): Observable<number[]> {
    // Faire une requête HTTP pour récupérer les données depuis l'API simulée
    return this.http
      .get<Belong[]>(`${this.apiUrl}?idBook=${idBook}`)
      .pipe(map((belongs) => belongs.map((belong) => belong.idCategory)));
  }

  // Récupère la liste d'ID de livres en fonction de l'ID de la catégorie
  getIdBookByIdCategory(categoryId: number): Observable<number[]> {
    // Faire une requête HTTP pour récupérer les données depuis l'API simulée
    return this.http
      .get<Belong[]>(`${this.apiUrl}?idCategory=${categoryId}`)
      .pipe(map((belongs) => belongs.map((belong) => belong.idBook)));
  }

  // Récupère les IDs des Belongs par rapport à l'ID du livre
  getBelongIdsByBookId(bookId: number): Observable<number[]> {
    return this.http
      .get<Belong[]>(`${this.apiUrl}?idBook=${bookId}`)
      .pipe(map((belongs) => belongs.map((belong) => belong.id)));
  }

  // Supprime les liaisons Belong en fonction de l'ID du livre
  deleteBelongById(belongId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${belongId}`);
  }
}
