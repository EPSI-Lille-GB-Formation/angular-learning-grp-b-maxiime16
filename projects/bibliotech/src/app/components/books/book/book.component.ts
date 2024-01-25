import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../../../models/book';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  
  categoriesLabels$: Observable<string[]> = new Observable<string[]>();

  constructor(
    private router: Router,
    private categService: CategoriesService
  ) {}

  @Input('value')
  book: Book | undefined;

  ngOnInit(): void {
    if (this.book) {
      this.categoriesLabels$ = this.categService.getLabelByIdCategory(
        this.book.id
      );
    }
  }

  GoToDetailsBookPage(idBook: number): void {
    this.router.navigate(['book', idBook]);
  }
}
