import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'book-edit-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <h2>Modifier le livre</h2>
      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
        <article class="grid">
          <div>
            <h3>Informations actuelles:</h3>
            <p>Titre: {{ book?.title }}</p>
            <p>Résumé: {{ book?.resume }}</p>
            <p>
              Date de création: {{ book?.createdAt | date : 'dd MMMM yyyy ' }}
            </p>
            <p>
              Dernière mise à jour:
              {{ book?.updateAt | date : 'dd MMMM yyyy h:mm' }}
            </p>
          </div>

          <div>
            <h3>Modifications:</h3>
            <div>
              <label for="title">Titre:</label>
              <input type="text" formControlName="title" required />
            </div>
            <div>
              <label for="resume">Résumé:</label>
              <textarea formControlName="resume" required></textarea>
            </div>
          </div>
        </article>
        <div *ngIf="erreurChampsVides" class="error-message">
          Veuillez remplir tous les champs.
        </div>
        <div *ngIf="modifReussi" class="success-message">
          L'ajout a réussi !
        </div>
        <div *ngIf="erreurAjout" class="error-message">L'ajout a échoué.</div>
        <button type="submit">Mettre à jour</button>
      </form>
      <button (click)="cancelEdit()">Annuler</button>
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
    `,
  ],
})
export class BookEditComponent implements OnInit {
  // Définition du formulaire réactif pour la modification du livre
  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required], // Champ titre avec validation requise
    resume: ['', Validators.required], // Champ résumé avec validation requise
  });

  // Propriété pour stocker les détails du livre à éditer
  book: Book | undefined;

  // Propriétés pour suivre l'état de la modification
  modifReussi: boolean = false;
  erreurAjout: boolean = false;
  erreurChampsVides: boolean = false;

  // Constructeur avec injection de dépendances
  constructor(
    private formBuilder: FormBuilder,
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

  // Méthode appelée lors de la soumission du formulaire de modification
  onSubmit(): void {
    if (this.bookForm.valid) {
      // Mettre à jour les propriétés du livre avec les nouvelles valeurs
      const updatedBook: Book = {
        ...this.book!, // Copie des propriétés existantes
        title: this.bookForm.value.title,
        resume: this.bookForm.value.resume,
        updateAt: new Date(), // Mettre à jour la date de modification
      };

      // Appeler la fonction updateBook du service
      this.bookService.updateBook(updatedBook).subscribe(
        () => {
          // Mise à jour réussie
          this.modifReussi = true;
          this.erreurAjout = false;
          this.erreurChampsVides = false;
          // Rediriger vers la page du livre après la mise à jour réussie avec un délai de 3000 millisecondes (3 secondes)
          setTimeout(() => {
            const bookId = this.route.snapshot.paramMap.get('id');
            this.router.navigate(['/book/', bookId]);
          }, 3000);
        },
        (error) => {
          // Gérer les erreurs de mise à jour ici
          console.error(error);
          this.modifReussi = false;
          this.erreurAjout = true;
          this.erreurChampsVides = false;
        }
      );
    } else {
      // Afficher une erreur si le formulaire n'est pas valide
      this.erreurChampsVides = true;
    }
  }

  // Méthode pour annuler la modification et rediriger vers la page détails du livre
  cancelEdit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/book/', bookId]);
  }
}
