import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { CategoriesService } from '../../../services/categories.service';
import { PageListComponent } from '../../pages/page-list/page-list.component';
import { UserService } from '../../../services/user.service';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-book-read',
  standalone: true,
  imports: [CommonModule, PageListComponent],
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css'],
})
export class BookReadComponent implements OnInit {

  authorName$: Observable<string | null> = new Observable<string | null>();
  authorFirstName$: Observable<string | null> = new Observable<string | null>();
  categoriesLabels$: Observable<string[]> = new Observable<string[]>();
  currentUserId$: Observable<number | null> = new Observable<number | null>();

  bookRead: Book | undefined;

  constructor(
    private bookService: BookService,
    private categService: CategoriesService,
    private userService: UserService,
    private shareService: ShareService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.currentUserId$ = this.shareService.getCurrentUserId();

    const bookId = this.route.snapshot.paramMap.get('idBook');

    if (bookId) {
      this.bookService.getBookById(+bookId).subscribe(
        (book: Book | undefined) => {
          this.bookRead = book;

          this.authorName$ = this.userService.getCurrentUserNameFromId(
            this.bookRead?.idUser || null
          );
          this.authorFirstName$ = this.userService.getCurrentUserFirstNameFromId(
            this.bookRead?.idUser || null
          );

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
