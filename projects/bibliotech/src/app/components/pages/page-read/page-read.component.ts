import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { ShareService } from '../../../services/share.service';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-page-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-read.component.html',
  styleUrl: './page-read.component.css',
})
export class PageReadComponent implements OnInit {
  pageRead: Page | undefined;
  bookRead: Book | undefined;
  currentUserId$: Observable<number | null>;
  currentUserRole$: Observable<String | null>;

  constructor(
    private pageService: PageService,
    private shareService: ShareService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUserId$ = new Observable<number | null>();
    this.currentUserRole$ = new Observable<string | null>();
  }

  ngOnInit(): void {
    this.currentUserId$ = this.shareService.currentUserId$;
    this.currentUserRole$ = this.shareService.currentUserRole$;

    const pageId = this.route.snapshot.paramMap.get('idPage');

    if (pageId) {
      this.pageService.getPageById(+pageId).subscribe(
        (book: Page | undefined) => {
          this.pageRead = book;
          console.log('Informations du livre:', this.pageRead);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }

    const bookId = this.route.snapshot.paramMap.get('idBook');
    if (bookId) {
      this.bookService
        .getBookById(+bookId)
        .subscribe((book: Book | undefined) => {
          this.bookRead = book;
        });
    }
  }

  cancelButton(): void {
    const idBook = this.route.snapshot.paramMap.get('idBook');
    this.router.navigate(['book', idBook]);
  }

  GoToPageUpdatePage() {
    const idBook = this.route.snapshot.paramMap.get('idBook');
    const idPage = this.route.snapshot.paramMap.get('idPage');
    this.router.navigate(['book', idBook, 'page', 'update', idPage]);
  }

  GoToPageDeletePage() {
    const idBook = this.route.snapshot.paramMap.get('idBook');
    const idPage = this.route.snapshot.paramMap.get('idPage');
    this.router.navigate(['book', idBook, 'page', 'delete', idPage]);
  }
}
