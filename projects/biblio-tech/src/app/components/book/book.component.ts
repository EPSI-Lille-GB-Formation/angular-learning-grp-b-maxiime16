import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { BOOKS } from '../../mocks/mock-book';
import { USERS } from '../../mocks/mock-user';

@Component({
  selector: 'book-component',
  standalone: true,
  imports: [CommonModule],
  template:`
    <article *ngIf="book">
      <div>
        <label>{{book.title}} - {{getAuthorName(book.idUser)}}</label>
      </div>
      <div>
      <button (click)="goToBookDetailsBookPage(book.id)" class="button-link">Voir plus</button>
      </div>
    </article>
      
  `,
  styles:[]
})
export class BookComponent {

  bookList = BOOKS;

  @Input("value")
  book: Book | undefined;

  constructor(
    private router: Router
  ){ }

  getAuthorName(authorId: number): string {
    const author = USERS.find(a => a.id === authorId)!;
    return `${author.firstName} ${author.lastName}`;
  }

  goToBookDetailsBookPage(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}