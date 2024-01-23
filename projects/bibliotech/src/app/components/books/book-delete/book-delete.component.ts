import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-delete.component.html',
  styleUrl: './book-delete.component.css'
})
export class BookDeleteComponent implements OnInit{
  book: Book | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ){}

  ngOnInit(): void {
      const idBook = this.route.snapshot.paramMap.get('idBook');
      console.log('id book to delete: ',idBook);

      if (idBook) {
        this.bookService.getBookById(+idBook).subscribe(
          (book: Book | undefined) => {
            this.book = book;
            console.log('Informations du livre:', this.book);
          },
          (error) => {
            console.error(error);
          }
        );
  
      }  

  }

  deleteBook(){
    if(this.book){
      this.bookService.deleteBook(this.book.id).subscribe(
        ()=>{
          console.log("Livre supprimé ! Retour a la page d'accueil");

          setTimeout(()=>{
            this.router.navigate(['']);
          }, 1000);

        },
        (error)=>{
          console.error(error);
        }
      );
    }
  }
  
  cancelButton(idBook: number | undefined): void{
    this.router.navigate(['book', idBook])
  }
}
