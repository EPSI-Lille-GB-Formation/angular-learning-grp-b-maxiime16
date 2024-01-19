// test.component.ts
import { Component, OnInit } from '@angular/core';
import { BelongsService } from '../../services/belongs.service';
import { CategoryService } from '../../services/categories.service';
import { BookService } from '../../services/book.service';  // Assurez-vous d'importer le service BookService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-votre-composant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>page test </h1>
    <div>      
      <label for="categorySelect">Sélectionnez une catégorie :</label>
      <select id="categorySelect" [(ngModel)]="selectedCategory" (change)="getIdBookByCategory()">
        <option value="">Tous les livres</option>
        <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
      </select>

      <button (click)="getIdBookByCategory()">Afficher les données</button>
      
      <div *ngIf="selectedCategory && idBooks">
        <p>Liste des ID de livres pour la catégorie {{ selectedCategory }} :</p>
        <ul>
          <li *ngFor="let idBook of idBooks">{{ idBook }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: []
})
export class TestComponent implements OnInit {

  categories: string[] = [];
  selectedCategory: string | undefined;
  idBooks: number[] = [];

  constructor(
    private categoryService: CategoryService,
    private belongsService: BelongsService,
    private bookService: BookService 
  ) {}

  ngOnInit(): void {
    this.categoryService.getLabel().subscribe(labels => {
      this.categories = labels;
    });
  }

  getIdBookByCategory() {
    if (this.selectedCategory === "") {
      this.bookService.getBooks().subscribe(books => {
        const idBooks = books.map(book => book.id);
        console.log('Liste de tous les idBooks :', idBooks);
        this.idBooks = idBooks;
      });
    } else if (this.selectedCategory !== undefined) {
      this.categoryService.getIdCategoryByLabel(this.selectedCategory).subscribe(idCategory => {
        console.log('Résultat de getIdCategoryByLabel:', idCategory);

        if (idCategory !== undefined) {
          this.belongsService.getIdBookByIdCategory(idCategory).subscribe(idBooks => {
            console.log('Liste de idBook obtenus par getIdBookByIdCategory:', idBooks);
            this.idBooks = idBooks;
          });
        }
      });
    }
  }
}
