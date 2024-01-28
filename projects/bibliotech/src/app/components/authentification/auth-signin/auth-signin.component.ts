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
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.css'],
})
export class AuthSigninComponent {
  registerForm: FormGroup;
  champsVides: boolean = false;
  messageInscription: string = '';
  messageInscriptionClass: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private shareService: ShareService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/),
        ],
      ],
    });
  }

  async onSubmit(): Promise<void> {
    console.log(
      'Valeur du formulaire avant vérification de la validité :',
      this.registerForm.value
    );

    this.champsVides = false;
    this.messageInscription = '';
    this.messageInscriptionClass = '';

    if (this.registerForm.valid) {
      console.log('Formulaire est valide.');

      const user: User = {
        id: 0,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: 'user', // role user par défaut
      };

      this.authService.checkUserExistence(user.email).subscribe(
        (userExists: boolean) => {
          if (userExists) {
            this.messageInscription = 'Cet email est déjà associé à un compte.';
          } else {
            this.authService.register(user).subscribe(
              (registeredUser: User | null) => {
                if (registeredUser) {
                  this.shareService.setLoggedIn(
                    true,
                    registeredUser.id,
                    registeredUser.role
                  );
                  this.messageInscription = 'Inscription réussie !';

                  setTimeout(() => {
                    this.router.navigate(['/login']);
                  }, 2000);
                } else {
                  this.shareService.setLoggedIn(false, null, null);
                  this.messageInscription = "Erreur lors de l'inscription.";
                }
              },
              (error) => {
                console.error("Erreur lors de l'inscription", error);
              }
            );
          }
        },
        (error) => {
          console.error(
            "Erreur lors de la vérification de l'existence de l'utilisateur",
            error
          );
        }
      );
    } else {
      console.log('Formulaire est invalide.');
      this.champsVides = true;
    }
  }
}
