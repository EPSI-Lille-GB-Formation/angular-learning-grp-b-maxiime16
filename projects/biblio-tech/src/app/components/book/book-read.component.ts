import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Book } from '../../models/book';
import { USERS } from '../../mocks/mock-user';
import { BookService } from '../../services/book.service';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'book-read-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Informations sur livre:</h1>
      <article>
        <p>Titre: {{ bookRead?.title }}</p>
        <p>Auteur: {{ getAuthorName(bookRead?.idUser) }}</p>
        <p>Résumé: {{ bookRead?.resume }}</p>
        <p>
          Date de création: {{ bookRead?.createdAt | date : 'dd MMMM yyyy ' }}
        </p>
        <p>
          Dernière mise à jour:
          {{ bookRead?.updateAt | date : 'dd MMMM yyyy, H:mm' }}
        </p>
      </article>
      <div class="grid">
        <button *ngIf="canEditOrDelete(bookRead?.idUser)" (click)="goToEditBookPage(bookRead?.id)">Éditer</button>
        <button *ngIf="canEditOrDelete(bookRead?.idUser)" class="delete-button" (click)="goToDeleteBookPage(bookRead?.id)">Supprimer</button>
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
export class BookReadComponent {
  bookRead: Book | undefined;
  isLoggedIn$: Observable<boolean>;

  @Input('value')
  book: Book | undefined;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private shareService: ShareService
  ) {
    this.isLoggedIn$ = this.shareService.isLoggedIn$;
  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.bookService
        .getBookById(+bookId)
        .subscribe((book) => (this.bookRead = book));
    }
  }

  getAuthorName(authorId: number | undefined): string {
    const author = USERS.find((a) => a.id === authorId)!;
    return `${author.firstName} ${author.lastName}`;
  }
  goToHomePage() {
    this.router.navigate(['']);
  }

  goToDeleteBookPage(bookId: number | undefined): void {
    if (bookId) {
      this.router.navigate(['/book/delete', bookId]);
    }
  }

  goToEditBookPage(bookId: number | undefined): void {
    if (bookId) {
      this.router.navigate(['/book/edit', bookId]);
    }
  }

  canEditOrDelete(bookUserId: number | undefined): boolean {
    const currentUserId = this.shareService.getCurrentUserId();
    const currentUserRole = this.shareService.getCurrentUserRole();
    
    console.log('Current user ID:', currentUserId);
    console.log('Current user role:', currentUserRole);
    console.log('Book user ID:', bookUserId);

    // Vérifier si l'utilisateur connecté est l'auteur du livre ou s'il a le rôle 'admin'
    return (
      (currentUserId !== null && bookUserId === currentUserId) ||
      currentUserRole === 'admin'
    );
  }
}
