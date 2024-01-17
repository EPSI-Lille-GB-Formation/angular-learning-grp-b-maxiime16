import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'book-delete-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Supprimer le livre</h2>
      <p>Êtes-vous sûr de vouloir supprimer le livre " {{ book?.title }} " ?</p>
      <div *ngIf="deleteSuccess" class="success-message">
        La suppression a réussi !
      </div>
      <div *ngIf="deleteError" class="error-message">
        La suppression a échoué.
      </div>
      <div class="grid">
        <button (click)="deleteBook()" class="delete-button">
          Supprimer définitivement
        </button>
        <button (click)="cancelDelete()">Annuler</button>
      </div>
    </div>
  `,
  styles: [
    `
      .success-message {
        color: green;
      }
      .error-message {
        color: red;
      }
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
export class BookDeleteComponent implements OnInit {
  // Propriété pour stocker les détails du livre à supprimer
  book: Book | undefined;

  // Propriétés pour suivre l'état de la suppression
  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  // Constructeur avec injection de dépendances
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Récupération de l'identifiant du livre à partir des paramètres de l'URL
    const bookId = this.route.snapshot.paramMap.get('id');

    // Vérification de la présence de l'identifiant du livre
    if (bookId) {
      // Appel du service pour récupérer les détails du livre par son identifiant
      this.bookService
        .getBookById(+bookId)
        .subscribe((book) => (this.book = book));
    }
  }

  // Méthode pour supprimer le livre
  deleteBook(): void {
    // Vérification de l'existence du livre
    if (this.book) {
      // Appel du service pour supprimer le livre par son identifiant
      this.bookService.deleteBook(this.book.id).subscribe(
        () => {
          // Mise à jour de l'état de la suppression
          this.deleteSuccess = true;
          this.deleteError = false;

          // Redirection vers la liste des livres après la suppression réussie avec un délai de 3000 millisecondes (3 secondes)
          setTimeout(() => {
            this.router.navigate(['']);
          }, 3000);
        },
        // Gestion de l'erreur en cas d'échec de la suppression
        (error) => {
          console.error(error);
          this.deleteSuccess = false;
          this.deleteError = true;
        }
      );
    }
  }

  // Méthode pour annuler la suppression et rediriger vers la page détails du livre
  cancelDelete(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/book/', bookId]);
  }
}
