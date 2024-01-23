import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Book } from '../../../models/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent{

  constructor(
    private router: Router,
  ){ }

  @Input("value")
  book: Book | undefined;

  GoToDetailsBookPage(idBook: number):void {
      this.router.navigate(['book', idBook]);
  }
}
