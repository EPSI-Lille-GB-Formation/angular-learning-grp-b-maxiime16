import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, map } from 'rxjs';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { Categories } from '../../../models/categories';
import { CategoriesService } from '../../../services/categories.service';
import { BelongService } from '../../../services/belong.service';
import { Belong } from '../../../models/belong';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css',
})
export class BookCreateComponent implements OnInit {
  categoryControls: { [key: number]: FormControl } = {};
  categories$: Observable<Categories[]> = new Observable<Categories[]>();

  ajoutReussi: boolean = false;
  ajoutError: boolean = false;

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    resume: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private bookService: BookService,
    private categoriesService: CategoriesService,
    private beloongService: BelongService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérez les catégories depuis le service et assignez-les à votre observable
    this.categoriesService.getCategories().subscribe(
      (categories: Categories[]) => {
        this.categories$ = new Observable<Categories[]>((observer) => {
          observer.next(categories);
          observer.complete();
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCategoryControl(categoryId: number): FormControl {
    if (!this.categoryControls[categoryId]) {
      this.categoryControls[categoryId] = this.formBuilder.control(false);
    }
    return this.categoryControls[categoryId];
  }

// ...

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
        console.log('Nouveau Book: ', newBook);

        // Récupération des catégories sélectionnées
        const selectedCategories = Object.keys(this.categoryControls)
          .filter((categoryId) => this.categoryControls[categoryId as any].value)
          .map((categoryId) => +categoryId);

        // Création d'un tableau d'observables pour récupérer les Belongs
        const belongObservables = selectedCategories.map(categoryId =>
          this.beloongService.getBelongs().pipe(
            map((belongs: Belong[]) => ({
              id: this.beloongService.genIdBelong(belongs),
              idBook: newBook.id,
              idCategory: categoryId,
            }))
          )
        );

        // Utilisation de forkJoin pour attendre que tous les appels asynchrones soient complets
        forkJoin(belongObservables).subscribe((newBelongs: Belong[]) => {
          newBelongs.forEach((newBelong: Belong, index) => {
            newBelong.id += index; // Incrémentation de l'ID
            console.log("new belong", newBelong);
            this.beloongService.createBelong(newBelong).subscribe(
              (createdBelong: Belong) => {
                console.log('Belong créé avec succès: ', createdBelong);
              },
              (error: any) => {
                console.error(error);
              }
            );
          });

          this.bookService.createBook(newBook).subscribe(
            (createdBook: Book) => {
              console.log('Book ajouté', newBook);
              this.ajoutReussi = true;
              this.ajoutError = false;
            },
            (error: any) => {
              console.error(error);
              this.ajoutReussi = false;
              this.ajoutError = true;
            }
          );
        });
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
