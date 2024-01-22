import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'book-create-component',
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
    private shared: ShareService
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.getLastBookId().subscribe((newBookId) => {
        const newBook: Book = {
          id: newBookId,
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
