import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-read.component.html',
  styleUrl: './book-read.component.css',
})
export class BookReadComponent implements OnInit {
  bookRead: Book | undefined;

  @Input('value')
  book: Book | undefined;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.bookService.getBookById(+bookId).subscribe(
        (book: Book | undefined) => {
          this.bookRead = book;
          console.log('Informations du livre:', this.bookRead);
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

  GoToDeletePage(idBook: number | undefined):void {
    this.router.navigate(['book/delete',idBook]);
  }
  GoToUpdatePage(idBook: number | undefined):void {
    this.router.navigate(['book/update',idBook]);
  }

}