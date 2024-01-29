import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { CategoriesService } from '../../../services/categories.service';
import { PageListComponent } from '../../pages/page-list/page-list.component';

@Component({
  selector: 'app-book-read',
  standalone: true,
  imports: [CommonModule, PageListComponent],
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css'],
})
export class BookReadComponent implements OnInit {
  categoriesLabels$: Observable<string[]> = new Observable<string[]>();

  bookRead: Book | undefined;

  constructor(
    private bookService: BookService,
    private categService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('idBook');

    if (bookId) {
      this.bookService.getBookById(+bookId).subscribe(
        (book: Book | undefined) => {
          this.bookRead = book;
          console.log('Informations du livre:', this.bookRead);

          this.categoriesLabels$ = this.categService.getLabelByIdCategory(
            this.bookRead?.id ?? 0
          );
        },
        (error: any) => {
          console.error(
            'Erreur lors de la récupération des informations du livre',
            error
          );
        }
      );
    }
  }

  GoToDeletePage(idBook: number | undefined): void {
    this.router.navigate(['book/delete', idBook]);
  }

  GoToUpdatePage(idBook: number | undefined): void {
    this.router.navigate(['book/update', idBook]);
  }
}
