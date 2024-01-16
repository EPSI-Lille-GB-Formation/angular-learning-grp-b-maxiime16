import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../services/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <h2>Connexion</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <article>
          <div>
            <label for="email">Email d'utilisateur:</label>
            <input
              type="email"
              formControlName="email"
              value="admin@test.com"
            />
          </div>
          <div>
            <label for="password">Mot de passe:</label>
            <input type="password" formControlName="password" value="admin" />
          </div>
          <div *ngIf="champsVides" class="error-message">
            Veuillez remplir tous les champs.
          </div>
          <div *ngIf="messageConnexion">
            {{ messageConnexion }}
          </div>
          <button type="submit">Se connecter</button>
        </article>
      </form>
    </div>
  `,
  styles: [
    `
      .error-message {
        color: red;
      }

      .success-message {
        color: green;
      }

      .message {
        margin-top: 10px;
        font-weight: bold;
      }
    `,
  ],
})
export class AuthLoginComponent {
  loginForm: FormGroup;
  champsVides: boolean = false;
  messageConnexion: string = '';
  messageConnexionClass: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private shareService: ShareService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // Réinitialiser les messages à chaque soumission
    this.champsVides = false;
    this.messageConnexion = '';
    this.messageConnexionClass = '';

    if (this.loginForm.valid) {
      const user: User = {
        id: 1, // Vous pouvez définir l'id en conséquence
        firstName: '', // Remplissez ces valeurs avec les données correctes
        lastName: '',
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        role: 'user', // Ou tout autre rôle que vous souhaitez attribuer
      };

      // Appeler le service d'authentification pour vérifier les informations
      this.authService.login(user).subscribe(
        (authenticatedUser: User | null) => {
          if (authenticatedUser) {
            this.shareService.setLoggedIn(
              true,
              authenticatedUser.id,
              authenticatedUser.role
            );
            this.messageConnexion = 'Connexion réussie !';

            setTimeout(() => {
              // Naviguez vers la liste des livres après la suppression réussie avec un délai
              this.router.navigate(['']);
            }, 1000);
          } else {
            this.shareService.setLoggedIn(false, null, null);
            this.messageConnexion = 'Email ou mot de passe incorrect.';
            console.log(
              'Connexion échouée: ',
              this.messageConnexion,
              '| LoggedValue=',
              this.shareService.isLoggedIn
            );
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion', error);
        }
      );
    } else {
      this.champsVides = true;
      console.log(
        'Connexion échouée: champ vide| LoggedValue=',
        this.shareService.isLoggedIn
      );
    }
  }
}