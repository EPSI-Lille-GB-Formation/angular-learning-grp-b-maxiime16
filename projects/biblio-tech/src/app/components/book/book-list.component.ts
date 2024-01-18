import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'book-list-component',
  standalone: true,
  imports: [CommonModule, BookComponent],
  template: `
    <h2>Liste des livres:</h2>
    <p *ngIf="!(isLoggedIn$ | async)">
      Vous devez être connecté pour pouvoir afficher les détails d'un livre
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
    <div>
      <ng-container *ngFor="let book of bookList$ | async">
        <book-component [value]="book"></book-component>
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
    `,
  ],
})
export class BookListComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  bookList$: Observable<Book[]> = new Observable<Book[]>(); // Initialisez la propriété ici

  constructor(
    private router: Router,
    private bookService: BookService,
    private shared: ShareService,
  ) {}

  ngOnInit() {
    // Obtenez la liste des livres à partir du service
    this.bookList$ = this.bookService.getBooks();

    this.isLoggedIn$ = this.shared.isLoggedIn$;
    // Afficher la valeur de isLoggedIn$ dans la console
    this.isLoggedIn$.subscribe((value) => {
      console.log('BookListComponent - isLoggedIn$', value);
    });
    console.log('BookListComponent - ngOnInit executed');
  }

  goToBookCreatePage() {
    this.router.navigate(['/add-book']);
  }
}
