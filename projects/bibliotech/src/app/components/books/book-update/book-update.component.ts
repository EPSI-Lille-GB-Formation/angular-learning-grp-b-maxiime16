import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from '../../../services/book.service';
import { CategoriesService } from '../../../services/categories.service';
import { Book } from '../../../models/book';
import { Observable, forkJoin, map } from 'rxjs';
import { BelongService } from '../../../services/belong.service';
import { Belong } from '../../../models/belong';
import { Categories } from '../../../models/categories';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css',
})
export class BookUpdateComponent implements OnInit {
  book: Book | undefined;
  categoryControls: { [key: number]: FormControl } = {};
  categories$: Observable<Categories[]> = new Observable<Categories[]>();
  categoriesLabels$: Observable<string[]> = new Observable<string[]>();

  modifReussi: boolean = false;
  erreurAjout: boolean = false;
  errorMessage: string = '';

  bookForm: FormGroup = this.formBuilder.group({
    title: [''],
    resume: [''],
    image: [''],
  });

  constructor(
    private bookService: BookService,
    private categoriesService: CategoriesService,
    private belongService: BelongService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idBook = this.route.snapshot.paramMap.get('idBook');

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

    if (idBook) {
      this.bookService
        .getBookById(+idBook)
        .subscribe((book: Book | undefined) => {
          this.book = book;
          console.log('Livre à modifier: ', this.book);
          this.categoriesLabels$ = this.categoriesService.getLabelByIdCategory(
            this.book?.id ?? 0
          );
        });
    }
  }

  getCategoryControl(categoryId: number): FormControl {
    if (!this.categoryControls[categoryId]) {
      this.categoryControls[categoryId] = this.formBuilder.control(false);
    }
    return this.categoryControls[categoryId];
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const updatedBook: Book = {
        ...this.book!,
        title:
          this.bookForm.value.title !== ''
            ? this.bookForm.value.title
            : this.book!.title,
        resume:
          this.bookForm.value.resume !== ''
            ? this.bookForm.value.resume
            : this.book!.resume,
        image:
          this.bookForm.value.image !== ''
            ? this.bookForm.value.image
            : this.book!.image,
        updateAt: new Date(),
      };

      // Afficher la liste des ID Belongs avec l'ID du livre
      this.belongService
        .getBelongIdsByBookId(this.book?.id ?? 0)
        .subscribe((belongIds: number[]) => {
          console.log('Liste des ID Belongs:', belongIds);

          // Supprimer chaque Belong en utilisant les IDs
          belongIds.forEach((belongId) => {
            this.belongService.deleteBelongById(belongId).subscribe(
              () => {
                console.log(
                  `Belong avec l'ID ${belongId} supprimé avec succès`
                );
              },
              (error: any) => {
                console.error(
                  `Erreur lors de la suppression de Belong avec l'ID ${belongId}`,
                  error
                );
              }
            );
          });
        });

      // Récupération des catégories sélectionnées
      const selectedCategories = Object.keys(this.categoryControls)
        .filter((categoryId) => this.categoryControls[categoryId as any].value)
        .map((categoryId) => +categoryId);

      // Création d'un tableau d'observables pour récupérer les Belongs
      const belongObservables = selectedCategories.map((categoryId) =>
        this.belongService.getBelongs().pipe(
          map((belongs: Belong[]) => ({
            id: this.belongService.genIdBelong(belongs),
            idBook: updatedBook.id,
            idCategory: categoryId,
          }))
        )
      );

      forkJoin(belongObservables).subscribe((newBelongs: Belong[]) => {
        newBelongs.forEach((newBelong: Belong, index) => {
          newBelong.id += index; // Incrémentation de l'ID
          console.log('new belong', newBelong);
          this.belongService.createBelong(newBelong).subscribe(
            (createdBelong: Belong) => {
              console.log('Belong créé avec succès: ', createdBelong);
            },
            (error: any) => {
              console.error(error);
            }
          );
        });

        this.bookService.updateBook(updatedBook).subscribe(
          () => {
            console.log("Livre mis à jour! Retour a la page d'accueil");
            this.modifReussi = true;
            this.erreurAjout = false;

            setTimeout(() => {
              const idBook = this.route.snapshot.paramMap.get('idBook');
              this.router.navigate(['book/', idBook]);
            }, 1000);
          },
          (error) => {
            console.error(error);
            this.modifReussi = false;
            this.erreurAjout = true;
            this.errorMessage =
              "Une erreur s'est produite lors de la mise à jour du livre.";
          }
        );
      });
    }
  }

  cancelButton(idBook: number | undefined): void {
    this.router.navigate(['book', idBook]);
  }
}
