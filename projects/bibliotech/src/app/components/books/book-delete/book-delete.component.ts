import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { BelongService } from '../../../services/belong.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-book-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-delete.component.html',
  styleUrl: './book-delete.component.css',
})
export class BookDeleteComponent implements OnInit {
  book: Book | undefined;

  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private belongService: BelongService
  ) {}

  ngOnInit(): void {
    const idBook = this.route.snapshot.paramMap.get('idBook');

    if (idBook) {
      this.bookService.getBookById(+idBook).subscribe(
        (book: Book | undefined) => {
          this.book = book;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deleteBook(): void {
    if (this.book) {
      this.belongService
        .getBelongIdsByBookId(this.book?.id ?? 0)
        .subscribe((belongIds: number[]) => {
          const deleteBelongs = belongIds.map((belongId) =>
            this.belongService.deleteBelongById(belongId)
          );

          forkJoin(deleteBelongs).subscribe(
            () => {
              if (this.book && this.book.id) {
                this.bookService.deleteBook(this.book.id).subscribe(
                  () => {
                    this.deleteSuccess = true;
                    this.deleteError = false;

                    setTimeout(() => {
                      this.router.navigate(['']);
                    }, 1000);
                  },
                  (error) => {
                    console.error('Error deleting book:', error);
                    this.deleteSuccess = false;
                    this.deleteError = true;
                  }
                );
              }
            },
            (error: any) => {
              console.error('Error deleting belongs:', error);
              this.deleteSuccess = false;
              this.deleteError = true;
            }
          );
        });
    }
  }

  cancelButton(idBook: number | undefined): void {
    this.router.navigate(['book', idBook]);
  }
}
