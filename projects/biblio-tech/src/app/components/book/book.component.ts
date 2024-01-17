// book.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'book-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article *ngIf="book">
      <div>
        <label>{{ book.title }} - {{ authorName$ | async }} {{ authorFirstName$ | async }}</label>
        <label>Categories:</label>
      </div>
      <div>
        <button (click)="goToBookDetailsBookPage(book.id)" class="button-link">
          Voir plus
        </button>
      </div>
    </article>
  `,
  styles: [],
})
export class BookComponent implements OnInit {
  @Input('value')
  book: Book | undefined;

  authorName$: Observable<string | null> = new Observable<string | null>();
  authorFirstName$: Observable<string | null> = new Observable<string | null>();

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.authorName$ = this.userService.getCurrentUserNameFromId(
      this.book?.idUser || null
    );
    this.authorFirstName$ = this.userService.getCurrentUserFirstNameFromId(
      this.book?.idUser || null
    );
  
  }
  
  goToBookDetailsBookPage(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
