import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Book } from '../../../models/book';
import { BookComponent } from '../book/book.component';
import { BookService } from '../../../services/book.service';
import { ShareService } from '../../../services/share.service';
import { CategoriesService } from '../../../services/categories.service';
import { BelongService } from '../../../services/belong.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  bookList: Observable<Book[]> = new Observable<Book[]>();
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  selectedCategory: string | undefined;
  idBooks: number[] = [];
  categories: string[] = [];

  constructor(
    private router: Router,
    private bookService: BookService,
    private shareService: ShareService,
    private categoryService: CategoriesService,
    private belongService: BelongService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.shareService.isLoggedIn$;
    this.bookList = this.bookService.getBooks();
    this.categoryService.getLabel().subscribe((labels) => {
      this.categories = labels;
    });
    this.selectedCategory = '';
  }

  goToBookCreatePage(): void {
    this.router.navigate(['/book/create']);
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
            this.belongService
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
