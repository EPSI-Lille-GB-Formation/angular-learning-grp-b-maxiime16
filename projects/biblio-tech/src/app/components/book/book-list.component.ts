import { Component } from '@angular/core';
import { BOOKS } from '../../mocks/mock-book';
import { BookComponent } from './book.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'book-list-component',
  standalone: true,
  imports: [CommonModule, BookComponent],
  template:`
  <h2>Liste des livres:</h2>
  <div>
    <ng-container *ngFor="let book of bookList">
      <book-component [value]="book"></book-component>
    </ng-container>
  </div>
  <div>
    <button (click)="goToBookCreatePage()" class="add-button">Ajouter un livre ⊕</button>
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
export class BookListComponent {

  bookList = BOOKS;

  constructor(
    private router: Router
  ) { }

  goToBookCreatePage(){
    this.router.navigate(['/add-book']);
  }

}
