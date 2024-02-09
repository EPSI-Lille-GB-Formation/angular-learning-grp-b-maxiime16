import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { Categories } from '../../../models/categories';
import { CategoriesService } from '../../../services/categories.service';
import { Belong } from '../../../models/belong';
import { BelongService } from '../../../services/belong.service';

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
  categories$: Observable<Categories[]>;
  categoriesLabels$: Observable<string[]>;

  modifReussi: boolean = false;
  erreurAjout: boolean = false;
  errorMessage: string = '';

  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private categoriesService: CategoriesService,
    private belongService: BelongService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories$ = this.categoriesService.getCategories();
    this.categoriesLabels$ = this.categoriesService.getLabelByIdCategory(0);
    this.bookForm = this.formBuilder.group({
      title: [''],
      resume: [''],
      image: [''],
    });
  }

  ngOnInit(): void {
    const idBook = this.route.snapshot.paramMap.get('idBook');

    if (idBook) {
      this.bookService.getBookById(+idBook).subscribe(
        (book: Book | undefined) => {
          this.book = book;
          this.categoriesLabels$ = this.categoriesService.getLabelByIdCategory(
            this.book?.id ?? 0
          );
        },
        (error: any) => {
          console.error(
            'Erreur lors de la récupération des informations du livre',
            error
          );
        }
      );
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
        title: this.bookForm.value.title || this.book!.title,
        resume: this.bookForm.value.resume || this.book!.resume,
        image: this.bookForm.value.image || this.book!.image,
        updateAt: new Date(),
      };

      const belongIds$ = this.belongService.getBelongIdsByBookId(
        this.book?.id ?? 0
      );

      belongIds$.subscribe((belongIds: number[]) => {
        belongIds.forEach((belongId) => {
          this.belongService.deleteBelongById(belongId).subscribe(
            () => {},
            (error: any) => {
              console.error(
                `Erreur lors de la suppression de Belong avec l'ID ${belongId}`,
                error
              );
            }
          );
        });
      });

      const selectedCategories = Object.keys(this.categoryControls)
        .filter((categoryId) => this.categoryControls[categoryId as any].value)
        .map((categoryId) => +categoryId);

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
          newBelong.id += index;
          this.belongService.createBelong(newBelong).subscribe(
            () => {},
            (error: any) => {
              console.error(error);
            }
          );
        });

        this.bookService.updateBook(updatedBook).subscribe(
          () => {
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
