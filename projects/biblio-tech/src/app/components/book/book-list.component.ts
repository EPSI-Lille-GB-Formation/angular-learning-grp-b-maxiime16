import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'book-list-component',
  standalone: true,
  imports: [CommonModule, BookComponent],
  template:`
  <h2>Liste des livres:</h2>
  <div *ngIf="!(isLoggedIn$ | async)">
    <button (click)="goToBookCreatePage()" class="add-button">Ajouter un livre ⊕</button>
  </div>
  <div>
    <ng-container *ngFor="let book of bookList$ | async">
      <book-component [value]="book"></book-component>
    </ng-container>
  </div>
  
  `,
  styles:[`
    .add-button{
      background-color:green;
      border: green;
    }
    .add-button:hover{
      background-color:darkgreen;
      border: darkgreen;
    }
  `]
})
export class BookListComponent implements OnInit{

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  bookList$: Observable<Book[]> = new Observable<Book[]>(); // Initialisez la propriété ici

  constructor(
    private router: Router,
    private bookService: BookService
  ) { 
  }


  ngOnInit() {
    // Obtenez la liste des livres à partir du service
    this.bookList$ = this.bookService.getBooks();
  }

  goToBookCreatePage(){
    this.router.navigate(['/add-book']);
  }
}