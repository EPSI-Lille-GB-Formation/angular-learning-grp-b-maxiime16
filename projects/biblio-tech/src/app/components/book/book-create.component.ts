import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'book-create-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div>
      <button (click)="goToHomePage()">Retour</button>
    </div>
    <div>
      <h2>Créer un nouveau livre</h2>
      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Titre:</label>
          <input
            type="text"
            formControlName="title"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="resume">Résumé:</label>
          <textarea
            formControlName="resume"
            class="form-control"
            required
          ></textarea>
        </div>
        <div *ngIf="erreurChampsVides" class="error-message">
          Veuillez remplir tous les champs.
        </div>
        <div *ngIf="ajoutReussi" class="success-message">
          L'ajout a réussi !
        </div>
        <div *ngIf="erreurAjout" class="error-message">L'ajout a échoué.</div>
        <div>
          <button type="submit">Ajouter le livre</button>
        </div>
      </form>
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
export class BookCreateComponent implements OnInit {
  // Initialisation du formulaire avec les champs titre et résumé
  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    resume: ['', Validators.required],
  });

  ajoutReussi: boolean = false;
  erreurAjout: boolean = false;
  erreurChampsVides: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private shared: ShareService,
  ) {}

  ngOnInit() {}

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.bookForm.valid) {
      // Récupérer l'ID de l'utilisateur connecté depuis le service ShareService
      const userId = this.shared.getCurrentUserId();

      // Création d'un nouvel objet Book à partir des valeurs du formulaire
      const newBook: Book = {
        id: 0,
        title: this.bookForm.value.title,
        resume: this.bookForm.value.resume,
        image: '',
        createdAt: new Date(),
        updateAt: null,
        idUser: userId,
        idCategory:[],
      };

      // Appel du service pour créer un nouveau livre
      this.bookService.createBook(newBook).subscribe(
        () => {
          // Gestion des résultats de l'ajout
          this.ajoutReussi = true;
          this.erreurAjout = false;
          this.erreurChampsVides = false;

          // Naviguer vers la liste des livres après l'ajout réussi avec un délai
          setTimeout(() => {
            this.router.navigate(['']);
          }, 3000);
        },
        (error) => {
          // Gestion de l'erreur lors de l'ajout
          console.error(error);
          this.ajoutReussi = false;
          this.erreurAjout = true;
        }
      );
    } else {
      // Afficher un message d'erreur si des champs obligatoires sont vides
      this.erreurChampsVides = true;
    }
  }

  // Fonction pour naviguer vers la page principale
  goToHomePage() {
    this.router.navigate(['']);
  }
}