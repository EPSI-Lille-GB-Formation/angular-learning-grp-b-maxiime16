import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
          <h3>Informations actuelles: </h3>
          <p>Titre: {{ book?.title }}</p>
          <p>Résumé: {{ book?.resume }}</p>
          <p>Date de création: {{ book?.createdAt | date:'dd MMMM yyyy '}}</p>
          <p>Dernière mise à jour: {{ book?.updateAt | date:'dd MMMM yyyy h:mm'}}
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
        <!-- Ajoutez ces lignes pour afficher les messages -->
        <div *ngIf="erreurChampsVides" class="error-message">Veuillez remplir tous les champs.</div>
        <div *ngIf="modifReussi" class="success-message">L'ajout a réussi !</div>
        <div *ngIf="erreurAjout" class="error-message">L'ajout a échoué.</div>
        <button type="submit" >Mettre à jour</button>
      </form>
      <button (click)="cancelEdit()">Annuler</button>
    </div>
  
  `,
  styles: [`
    .success-message {
      color: green;
    }
    
    .error-message {
      color: red;
    }
  `]
})


export class BookEditComponent implements OnInit{

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    resume: ['', Validators.required],
  });

  book: Book | undefined;
  modifReussi: boolean = false;
  erreurAjout: boolean = false;
  erreurChampsVides: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.bookService.getBookById(+bookId).subscribe(book => this.book = book);
    }
  }
  

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
          // Rediriger vers la page du livre après la mise à jour réussie
          setTimeout(() =>{
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
  

  cancelEdit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/book/', bookId]);
  }
}
