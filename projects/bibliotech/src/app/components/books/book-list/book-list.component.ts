import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Book } from '../../../models/book';
import { BookComponent } from '../book/book.component';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{

  bookList: Observable<Book[]> = new Observable<Book[]>();

  constructor(
    private router: Router,
    private bookService: BookService,
  ){}

  ngOnInit(){
    this.bookList = this.bookService.getBooks();
    this.bookList.subscribe((books) =>{
      console.log('Liste des livres:', books)
    })
  }

  GoToBookCreatePage(){
    this.router.navigate(['/book/create']);
  }

}
