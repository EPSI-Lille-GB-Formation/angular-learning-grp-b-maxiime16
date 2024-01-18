import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { ShareService } from '../../services/share.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/categories.service';

@Component({
  selector: 'book-read-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Informations sur le livre :</h1>
      <article>
        <p>Titre : {{ bookRead?.title }}</p>
        <p>Auteur : {{ authorName$ | async }} {{ authorFirstName$ | async }}</p>
        <p>Catégories: {{ categoriesLabels$ | async }}</p>
        <ul>
          <li *ngFor="let label of categoriesLabels$ | async">
            {{ label }}
          </li>
        </ul>
        <p>Résumé : {{ bookRead?.resume }}</p>
        <p>
          Date de création : {{ bookRead?.createdAt | date : 'dd MMMM yyyy ' }}
        </p>
        <p>
          Dernière mise à jour :
          {{ bookRead?.updateAt | date : 'dd MMMM yyyy, H:mm' }}
        </p>
      </article>
      <div class="grid">
        <button (click)="goToEditBookPage(bookRead?.id)">Éditer</button>
        <button
          class="delete-button"
          (click)="goToDeleteBookPage(bookRead?.id)"
        >
          Supprimer
        </button>
      </div>
      <button (click)="goToHomePage()">Retour</button>
    </div>
  `,
  styles: [
    `
      .delete-button {
        background-color: red;
        border: red;
      }
      .delete-button:hover {
        background-color: darkred;
        border: red;
      }
    `,
  ],
})
export class BookReadComponent implements OnInit {
  // Propriétés
  bookRead: Book | undefined; // Le livre actuellement affiché
  isLoggedIn$: Observable<boolean>; // Observable indiquant si l'utilisateur est connecté
  authorName$: Observable<string | null> = new Observable<string | null>(); // Observable contenant le nom de l'auteur
  authorFirstName$: Observable<string | null> = new Observable<string | null>(); // Observable contenant le prénom de l'auteur
  categoriesLabels$: Observable<string[]> = new Observable<string[]>();

  @Input('value')
  book: Book | undefined; // Propriété d'entrée pour recevoir le livre à afficher

  // Constructeur
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private shareService: ShareService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.isLoggedIn$ = this.shareService.isLoggedIn$;
  }

  // Hook de cycle de vie OnInit
  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      // Obtenir les détails du livre par ID
      this.bookService.getBookById(+bookId).subscribe((book) => {
        this.bookRead = book;

        if (book && book.idUser) {
          // Obtenir les détails de l'utilisateur par ID
          this.userService
            .getCurrentUserFromId(book.idUser)
            .subscribe((user) => {
              if (user) {
                // Créer de nouveaux Observables pour le nom et le prénom de l'auteur
                this.authorName$ = new Observable<string | null>((observer) => {
                  observer.next(user.firstName);
                  observer.complete();
                });

                this.authorFirstName$ = new Observable<string | null>(
                  (observer) => {
                    observer.next(user.lastName);
                    observer.complete();
                  }
                );
                this.GetLabelByIdCategory(this.book?.id || null);
              }
            });
        }
      });
    }
  }

  // Méthodes

  // Naviguer vers la page d'accueil
  goToHomePage() {
    this.router.navigate(['']);
  }

  // Naviguer vers la page de suppression du livre
  goToDeleteBookPage(bookId: number | undefined): void {
    if (bookId) {
      this.router.navigate(['/book/delete', bookId]);
    }
  }

  // Naviguer vers la page d'édition du livre
  goToEditBookPage(bookId: number | undefined): void {
    if (bookId) {
      this.router.navigate(['/book/edit', bookId]);
    }
  }

  GetLabelByIdCategory(idBook: number | null): void {
    if (idBook !== null) {
      this.categoryService.getLabelByIdCategory(idBook).subscribe(
        (labels) => {
          this.categoriesLabels$ = new Observable<string[]>((observer) => {
            observer.next(labels);
            observer.complete();
          });
        },
        (error) => {
          console.error('Error retrieving labels:', error);
        }
      );
    }
  }
  
}
