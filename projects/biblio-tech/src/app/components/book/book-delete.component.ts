import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'book-delete-component',
  standalone: true,
  imports: [CommonModule],
  template:`
    <div>
      <h2>Supprimer le livre</h2>
      <p>Êtes-vous sûr de vouloir supprimer le livre " {{ book?.title }} " ?</p>
      <div *ngIf="deleteSuccess" class="success-message">La suppression a réussi !</div>
      <div *ngIf="deleteError" class="error-message">La suppression a échoué.</div>
      <div class="grid">
        <button (click)="deleteBook()" class="delete-button" >Supprimer définitivement</button>
        <button (click)="cancelDelete()">Annuler</button>
      </div>
    </div>
  `,
  styles: [`
    .success-message {
      color: green;
    }
    .error-message {
      color: red;
    }
    .delete-button{
      background-color:red;
      border: red;
    }
    .delete-button:hover{
      background-color:darkred;
      border: red;
    }
  `],
})
export class BookDeleteComponent implements OnInit {

  book: Book | undefined;
  
  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.bookService.getBookById(+bookId).subscribe(book => this.book = book);
    }
  }

  deleteBook(): void {
    if (this.book) {
      this.bookService.deleteBook(this.book.id).subscribe(
        () => {
          this.deleteSuccess = true;
          this.deleteError = false;
    
          setTimeout(() => {
            // Naviguez vers la liste des livres après la suppression réussie avec un delai
            this.router.navigate(['']);
          }, 3000);
        },
        (error) => {
          console.error(error);
          this.deleteSuccess = false;
          this.deleteError = true;
        }
      );
    }
  }
  

  cancelDelete(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/book/', bookId]);
  }
}