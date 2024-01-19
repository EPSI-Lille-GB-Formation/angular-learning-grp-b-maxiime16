import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'book-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article *ngIf="book">
      <div class="grid">
        <div>
          <img [src]="book.image" alt="Image Description" />
        </div>
        <div>
          <label>{{ book.title }}</label>
          <label>{{ authorName$ | async }} {{ authorFirstName$ | async }}</label>
          <label>Catgories:</label>
          <ul *ngIf="categoriesLabels$ | async as categories">
            <li *ngFor="let category of categories">{{ category }}</li>
          </ul>
        </div>
      </div>
        <button (click)="goToBookDetailsBookPage(book.id)" class="button-link">
          Voir plus
        </button>
    </article>
  `,
  styles: [
    `
      img {
        width: 200px; /* Spécifiez la largeur souhaitée */
        height: 300px; /* Spécifiez la hauteur souhaitée si nécessaire */
        object-fit: cover; /* Assure que l'image remplit complètement sa boîte tout en conservant son ratio d'aspect */
        margin-bottom: 10px;
      }
      ,
      article {
        width: calc(
          50% - 20px
        ); /* Chaque article occupe la moitié de la largeur avec une marge de 10px de chaque côté */
        margin: 10px;
        box-sizing: border-box; /* Assure que la largeur inclut la marge et le padding */
      },
    `,
  ],
})
export class BookComponent implements OnInit {
  @Input('value')
  book: Book | undefined;

  authorName$: Observable<string | null> = new Observable<string | null>();
  authorFirstName$: Observable<string | null> = new Observable<string | null>();
  categoriesLabels$: Observable<string[]> = new Observable<string[]>();
  imageUrl = 'http://www.volonte-d.com/resumes/images/volume107.jpg';

  constructor(
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.authorName$ = this.userService.getCurrentUserNameFromId(
      this.book?.idUser || null
    );
    this.authorFirstName$ = this.userService.getCurrentUserFirstNameFromId(
      this.book?.idUser || null
    );

    this.GetLabelByIdCategory(this.book?.id || null);
  }

  goToBookDetailsBookPage(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

  GetLabelByIdCategory(idBook: number | null): void {
    if (idBook !== null) {
      this.categoriesLabels$ =
        this.categoryService.getLabelByIdCategory(idBook);
    }
  }
}
