import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css',
})

export class BookCreateComponent {
  ajoutReussi: boolean = false;
  ajoutError: boolean = false;

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    resume: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.getBooks().subscribe(
        (books: Book[]) => {
          const newBook: Book = {
            id: this.bookService.genIdBook(books),
            title: this.bookForm.get('title')?.value,
            resume: this.bookForm.get('resume')?.value,
            image: this.bookForm.get('image')?.value,
            createdAt: new Date(),
            updateAt: null,
            idUser: 1, // A changer
          };

          this.bookService.createBook(newBook).subscribe(
            (createdBook: Book) => {
              this.ajoutReussi = true;
              this.ajoutError = false;
              console.log('Book créé avec succés:', createdBook);

              setTimeout(() => {
                this.router.navigate(['']);
              }, 3000);
            },
            (error: any) => {
              console.error(error);
              this.ajoutReussi = false;
              this.ajoutError = true;
            }
          );
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  goToHomePage() {
    this.router.navigate(['']);
  }
}
