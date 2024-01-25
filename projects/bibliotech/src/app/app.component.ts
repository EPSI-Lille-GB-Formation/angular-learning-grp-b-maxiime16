import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthComponent } from './components/authentification/auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthComponent],
  template: `
    <div class="container">
      <ng-container>
        <app-auth></app-auth>
      </ng-container>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [``],
})
export class AppComponent {
  title = 'bibliotech';

  constructor() {}
}
