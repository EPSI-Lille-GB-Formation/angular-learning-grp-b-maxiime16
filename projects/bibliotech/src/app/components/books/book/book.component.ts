import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Book } from '../../../models/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  template:`
  <article *ngIf="book">
    <div class="grid">
        <div>
            <img [src]="book.image"/>
        </div>
        <div>
            <label>Titre: {{book.title}}</label>
            <label>Auteur: </label>
            <label>Catégories: </label>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
    <div>
        <button (click)="GoToDetailsBookPage(book.id)">Voir détails</button>
    </div>
</article>

  `,
  styleUrl: './book.component.css'
})
export class BookComponent{

  constructor(
    private router: Router,
  ){ }

  @Input("value")
  book: Book | undefined;

  GoToDetailsBookPage(idBook: number):void {
      this.router.navigate(['book', idBook]);
  }
}
