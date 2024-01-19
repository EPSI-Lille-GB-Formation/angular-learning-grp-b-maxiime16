import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { ShareService } from '../../services/share.service';
import { CategoryService } from '../../services/categories.service';
import { BelongsService } from '../../services/belongs.service';

@Component({
  selector: 'book-list-component',
  standalone: true,
  imports: [CommonModule, BookComponent, FormsModule],
  template: `
    <h2>Liste des livres :</h2>

    <div>
      <label for="categorySelect">Sélectionnez une catégorie :</label>
      <select
        id="categorySelect"
        [(ngModel)]="selectedCategory"
        (change)="getIdBookByCategory()"
      >
        <option value="">Tous les livres</option>
        <option *ngFor="let category of categories" [value]="category">
          {{ category }}
        </option>
      </select>
    </div>
    <p *ngIf="!(isLoggedIn$ | async)">
      Vous devez être connecté pour pouvoir afficher les détails d'un livre.
    </p>
    <div>
      <button
        *ngIf="isLoggedIn$ | async"
        (click)="goToBookCreatePage()"
        class="add-button"
      >
        Ajouter un livre ⊕
      </button>
    </div>
    <div class="listBook">
      <ng-container *ngFor="let book of bookList$ | async">
        <ng-container *ngIf="shouldDisplayBook(book)">
          <book-component [value]="book"></book-component>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .add-button {
        background-color: green;
        border: green;
      }
      .add-button:hover {
        background-color: darkgreen;
        border: darkgreen;
      }
      .listBook {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px; /* Ajoutez de l'espace entre les colonnes */
      }
    `,
  ],
})
export class BookListComponent implements OnInit {
  // Propriétés du composant
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  bookList$: Observable<Book[]> = new Observable<Book[]>();
  selectedCategory: string | undefined;
  categories: string[] = [];
  idBooks: number[] = [];

  // Constructeur avec injection des dépendances
  constructor(
    private router: Router,
    private bookService: BookService,
    private shared: ShareService,
    private categoryService: CategoryService,
    private belongsService: BelongsService
  ) {}

  // Méthode du cycle de vie Angular appelée lors de l'initialisation du composant
  ngOnInit() {
    this.bookList$ = this.bookService.getBooks();
    this.categoryService.getLabel().subscribe((labels) => {
      this.categories = labels;
    });
    this.selectedCategory = '';
    this.isLoggedIn$ = this.shared.isLoggedIn$;
  }

  goToBookCreatePage() {
    this.router.navigate(['/add-book']);
  }

  getIdBookByCategory() {
    if (this.selectedCategory === '') {
      this.bookService.getBooks().subscribe((books) => {
        const idBooks = books.map((book) => book.id);
        this.idBooks = idBooks;
      });
    } else if (this.selectedCategory !== undefined) {
      this.categoryService
        .getIdCategoryByLabel(this.selectedCategory)
        .subscribe((idCategory) => {
          if (idCategory !== undefined) {
            this.belongsService
              .getIdBookByIdCategory(idCategory)
              .subscribe((idBooks) => {
                this.idBooks = idBooks;
              });
          }
        });
    }
  }

  shouldDisplayBook(book: Book): boolean {
    if (this.selectedCategory === '') {
      return true;
    }
    return this.idBooks.includes(book.id);
  }
}
