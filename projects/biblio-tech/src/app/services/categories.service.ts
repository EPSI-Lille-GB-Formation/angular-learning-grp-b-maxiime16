import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BelongsService } from './belongs.service';
import { Observable, forkJoin, switchMap, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'api/categories';

  constructor(
    private http: HttpClient,
    private belongsService: BelongsService,
  ) {}

  getLabelByIdCategory(idBook: number): Observable<string[]> {
    return this.belongsService.getIdCategoryByIdBook(idBook).pipe(
      switchMap(categoryIds => {
        if (categoryIds.length === 0) {
          // Aucune catégorie trouvée, retourner un Observable vide
          return of([]);
        }

        // Pour chaque ID de catégorie, faites une requête HTTP pour obtenir le label
        const requests = categoryIds.map(categoryId =>
          this.http.get<any>(`${this.apiUrl}/${categoryId}`).pipe(
            map(response => response.label) // Remplacez 'label' par la propriété correcte dans votre objet de réponse
          )
        );

        // Utilisez forkJoin pour exécuter toutes les requêtes en parallèle
        return forkJoin(requests);
      })
    );
  }

  getIdCategoryByLabel(label: string): Observable<number | undefined> {
    const url = `${this.apiUrl}?label=${label}`;
    return this.http.get<any[]>(url).pipe(
      map(categories => (categories.length > 0 ? categories[0].id : undefined))
    );
  }


getLabel(): Observable<string[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(categories => categories.map(category => category.label))
  );
}

}
