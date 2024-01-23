import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../services/share.service';
import { CategoryService } from '../../services/categories.service';
import { InMemoryDataService } from '../../services/in-memory-data.service';

@Component({
  selector: 'book-create-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div>
      <h2>Créer un nouveau livre</h2>
      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Titre:</label>
          <input
            type="text"
            formControlName="title"
            class="form-control"
            required
            placeholder="Titre"
          />
          <label>Résumé:</label>
          <textarea
            formControlName="resume"
            class="form-control"
            required
            placeholder="Résumé"
          ></textarea>
          <label>Image:</label>
          <input
            type="text"
            formControlName="image"
            class="form-control"
            required
            placeholder="URL de l'image"
          />
          <fieldset>
            <legend>Catégories:</legend>
            <div>
              <input type="checkbox" id="music" name="interest" value="music" />
              <label for="music">Musique</label>
            </div>
          </fieldset>
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
    private categoryService: CategoryService,
    private IMDS: InMemoryDataService,
  ) {}

  ngOnInit() {}

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.getLastBookId().subscribe((newBookId) => {
        const newBook: Book = {
          id: 1,
          title: this.bookForm.value.title,
          resume: this.bookForm.value.resume,
          image: '',
          createdAt: new Date(),
          updateAt: null,
          idUser: this.shared.getCurrentUserId(),
        };

        this.bookService.createBook(newBook).subscribe(
          () => {
            this.ajoutReussi = true;
            this.erreurAjout = false;
            this.erreurChampsVides = false;

            setTimeout(() => {
              this.router.navigate(['']);
            }, 3000);
          },
          (error) => {
            console.error(error);
            this.ajoutReussi = false;
            this.erreurAjout = true;
          }
        );
      });
    } else {
      this.erreurChampsVides = true;
    }
  }

  goToHomePage() {
    this.router.navigate(['']);
  }
}