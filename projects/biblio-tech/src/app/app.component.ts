import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './components/authentification/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthComponent],
  template: `
    <div class="container">
      <h1 class="titre_projet">Biblio'Tech - Angular app</h1>
      <ng-container>
        <app-auth></app-auth>
      </ng-container>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .titre_projet {
        text-shadow: 1px 1px #000;
        color: #719bb9;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {}
