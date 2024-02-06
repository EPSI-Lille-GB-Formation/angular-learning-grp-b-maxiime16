// page-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { PageComponent } from '../page/page.component';
import { ShareService } from '../../../services/share.service';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {
  pageList: Observable<Page[]> = new Observable<Page[]>();
  currentUserId$: Observable<number | null> = new Observable<number | null>();
  bookRead: Book | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private shareService: ShareService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.currentUserId$ = this.shareService.getCurrentUserId();
    const bookId = Number(this.route.snapshot.paramMap.get('idBook'));

    this.pageList = this.pageService.getPageByIdBook(bookId);

    this.bookService
      .getBookById(+bookId)
      .subscribe((book: Book | undefined) => {
        this.bookRead = book;
      });
  }

  GoToPageCreatePage() {
    const idBook = this.route.snapshot.paramMap.get('idBook');
    this.router.navigate(['book', idBook, 'create']);
  }
}
