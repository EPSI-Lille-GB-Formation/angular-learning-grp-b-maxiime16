import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent implements OnInit{
  book: Book | undefined;

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    resume: ['', Validators.required],
    image:['', Validators.required],
  });

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ){

  }

  ngOnInit(): void {
    const idBook = this.route.snapshot.paramMap.get('idBook');

    if(idBook){
      this.bookService.getBookById(+idBook).subscribe((book)=> (this.book = book));
    }
  }

  onSubmit():void{
    if (this.bookForm.valid){
      const updatedBook: Book = {
        ...this.book!,
        title: this.bookForm.value.title,
        resume: this.bookForm.value.resume,
        image: this.bookForm.value.image,
        updateAt: new Date(),
      }

      this.bookService.updateBook(updatedBook).subscribe(()=>{
        console.log("Livre mis à jour! Retour a la page d'accueil");

        setTimeout(()=>{
          const idBook = this.route.snapshot.paramMap.get('id');
          this.router.navigate(['book/', idBook]);
        }, 1000);
      },
      (error)=>{
        console.error(error)
      })
    }

  }

  cancelButton(idBook: number | undefined): void{
    this.router.navigate(['book', idBook])
  }

}
