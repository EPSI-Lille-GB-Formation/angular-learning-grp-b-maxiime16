import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../models/user';
import { ShareService } from '../../../services/share.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
})
export class AuthLoginComponent {
  loginForm: FormGroup;
  champsVides = false;
  messageConnexion = '';
  messageConnexionClass = '';

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
    this.champsVides = false;
    this.messageConnexion = '';
    this.messageConnexionClass = '';

    if (this.loginForm.valid) {
      const user: User = {
        id: 0,
        firstName: '',
        lastName: '',
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        role: '',
      };

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
              this.router.navigate(['']);
            }, 2000);
          } else {
            this.shareService.setLoggedIn(false, null, null);
            this.messageConnexion = 'Email ou mot de passe incorrect.';
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion', error);
        }
      );
    } else {
      this.champsVides = true;
    }
  }
}
