import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

import { Categories } from '../models/categories';
import { BelongService } from './belong.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiURL: string = 'api/categories';

  constructor(private http: HttpClient, private belongService: BelongService) {}

  // méthode pour récupérer la liste des catégories
  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiURL);
  }

  // méthode pour créer une catégorie
  createCategory(newCateg: Categories): Observable<Categories> {
    return this.http.post<Categories>(this.apiURL, newCateg);
  }

  // méthode pour générer un nouvel id
  genIdCategory(collection: Categories[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((item) => item.id)) + 1
      : 1;
  }

  // méthode pour récupérer une catégorie par son id
  getCategoryById(id: number): Observable<Categories | undefined> {
    const URL = `${this.apiURL}/${id}`;
    return this.http.get<Categories | undefined>(URL);
  }

  // méthode pour update une catégorie
  updateCategory(categories: Categories): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = `${this.apiURL}/${categories.id}`;
    return this.http.put(url, categories, httpOptions);
  }

  // méthode pour supprimer une catégorie
  deleteCategory(id: number): Observable<void> {
    const URL = `${this.apiURL}/${id}`;
    return this.http.delete<void>(URL);
  }

  // méthode pour récupérer les labels des catégories en fonction de l'ID du livre
  getLabelByIdCategory(idBook: number): Observable<string[]> {
    return this.belongService.getIdCategoryByIdBook(idBook).pipe(
      switchMap((categoryIds) => {
        if (categoryIds.length === 0) {
          // Aucune catégorie trouvée, retourner un Observable vide
          return of([]);
        }

        // Pour chaque ID de catégorie, faites une requête HTTP pour obtenir le label
        const requests = categoryIds.map((categoryId) =>
          this.http.get<any>(`${this.apiURL}/${categoryId}`).pipe(
            map((response) => response.label) // Remplacez 'label' par la propriété correcte dans votre objet de réponse
          )
        );

        // Utilisez forkJoin pour exécuter toutes les requêtes en parallèle
        return forkJoin(requests);
      })
    );
  }

  getIdCategoryByLabel(label: string): Observable<number | undefined> {
    const url = `${this.apiURL}?label=${label}`;
    return this.http
      .get<any[]>(url)
      .pipe(
        map((categories) =>
          categories.length > 0 ? categories[0].id : undefined
        )
      );
  }

  getLabel(): Observable<string[]> {
    return this.http
      .get<any[]>(this.apiURL)
      .pipe(map((categories) => categories.map((category) => category.label)));
  }
}
