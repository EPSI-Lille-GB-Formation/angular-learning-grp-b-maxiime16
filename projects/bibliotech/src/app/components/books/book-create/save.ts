import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { switchMap, catchError, finalize } from 'rxjs/operators';

import { Book } from '../../../models/book';
import { Categories } from '../../../models/categories';
import { BookService } from '../../../services/book.service';
import { CategoriesService } from '../../../services/categories.service';
import { Belong } from '../../../models/belong';
import { BelongService } from '../../../services/belong.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent implements OnInit {
  ajoutReussi: boolean = false;
  ajoutError: boolean = false;
  categories$: Observable<Categories[]> = new Observable<Categories[]>();
  books: Book[] = [];

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    resume: ['', Validators.required],
    image: ['', Validators.required],
  });

  categoryControls: { [key: number]: FormControl } = {};

  constructor(
    private bookService: BookService,
    private categoriesService: CategoriesService,
    private belongService: BelongService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategories();

    // Initialiser les contrôles pour les cases à cocher
    this.categories$.subscribe((categories) => {
      categories.forEach((category) => {
        this.categoryControls[category.id] = new FormControl(false);
      });
      this.bookForm.addControl('selectedCategories', new FormControl([]));
    });

    // Charger la liste actuelle des livres
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  getCategoryControl(categoryId: number): FormControl {
    return this.categoryControls[categoryId];
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook: Book = {
        id: this.bookService.genIdBook(this.books),
        title: this.bookForm.get('title')?.value,
        resume: this.bookForm.get('resume')?.value,
        image: this.bookForm.get('image')?.value,
        createdAt: new Date(),
        updateAt: null,
        idUser: 1, // À changer
      };

      this.bookService
        .createBook(newBook)
        .pipe(
          switchMap((createdBook: Book) => {
            const bookId = createdBook.id;

            const selectedCategories = Object.keys(this.categoryControls)
              .filter(
                (categoryId) => this.categoryControls[categoryId as any].value
              )
              .map((categoryId) => +categoryId);

            if (selectedCategories.length > 0) {
              // Créer un nouveau Belong pour chaque catégorie sélectionnée
              const belongRequests = selectedCategories.map((categoryId) => {
                const newBelong: Belong = {
                  idBook: bookId,
                  idCategory: categoryId,
                };
                console.log('Nouveau Belong: ', newBelong);

                return this.belongService.createBelong(newBelong).pipe(
                  catchError((error) => {
                    console.error('Erreur lors de la création du Belong', error);
                    return throwError(error);
                  })
                );
              });

              // Utiliser combineLatest pour attendre toutes les requêtes avant de passer à la suite
              return forkJoin(belongRequests).pipe(
                catchError((error) => {
                  console.error('Erreur lors de la création des Belongs', error);
                  return throwError(error);
                })
              );
            } else {
              // Aucune catégorie sélectionnée
              return of([]);
            }
          }),
          catchError((error) => {
            console.error('Erreur lors de la création du Book', error);
            return throwError(error);
          }),
          finalize(() => {
            // Nettoyer et effectuer d'autres actions si nécessaire
          })
        )
        .subscribe(
          () => {
            this.ajoutReussi = true;
            this.ajoutError = false;
            console.log('Book et Belongs créés avec succès');

            setTimeout(() => {
              this.router.navigate(['']);
            }, 3000);
          },
          (error: any) => {
            this.ajoutReussi = false;
            this.ajoutError = true;
          }
        );
    }
  }

  goToHomePage(): void {
    this.router.navigate(['']);
  }
}
