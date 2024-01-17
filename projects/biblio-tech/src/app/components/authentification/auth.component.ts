import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareService } from '../../services/share.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <article>
        <button *ngIf="!(isLoggedIn$ | async)" (click)="goToLoginPage()">
          Se connecter
        </button>
        <div *ngIf="isLoggedIn$ | async" class="grid">
          <div>
            <p>
              Vous êtes connecté, bonjour {{ currentUserName$ }}
              {{ currentUserFirstName$ }}
            </p>
            <p>role: ({{ currentUserRole$ | async }})</p>
          </div>
          <div class="grid">
            <button (click)="goToUserReadPage()">Voir profil</button>
            <button *ngIf="(currentUserRole$ | async) === 'admin'">
              Admin zone
            </button>
            <button (click)="logout()">Se déconnecter</button>
          </div>
        </div>
      </article>
    </div>
  `,
  styles: [],
})
export class AuthComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  currentUserId$: Observable<number | null> = new Observable<number | null>();
  currentUserRole$: Observable<string | null> = new Observable<string | null>();
  currentUserName$: string | null = null; // Propriété pour le nom d'utilisateur
  currentUserFirstName$: string | null = null; // Propriété pour le prénom

  constructor(
    private router: Router,
    private shared: ShareService,
    private authService: AuthService,
    private userService: UserService // Service d'utilisateur pour récupérer les noms d'utilisateur
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.shared.isLoggedIn$;
    this.currentUserId$ = this.shared.currentUserId$;
    this.currentUserRole$ = this.shared.currentUserRole$;

    // Extraction de la valeur de l'observable
    this.currentUserId$.subscribe((userId: number | null) => {
      if (userId !== null) {
        this.userService.getCurrentUserNameFromId(userId).subscribe(
          (userName: string | null) => this.currentUserName$ = userName
        );

        this.userService.getCurrentUserFirstNameFromId(userId).subscribe(
          (firstName: string | null) => this.currentUserFirstName$ = firstName
        );
      }
    });
  }

  // Naviguer vers la page de connexion
  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  goToUserReadPage(): void {
    this.currentUserId$.subscribe((userId: number | null) => {
      if (userId !== null) {
        this.router.navigate(['/user', userId]);
      }
    });
  }

  // Fonction de déconnexion
  logout(): void {
    this.authService.logout();
    // Naviguer vers la page principale après la déconnexion avec un délai
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1500);
  }
}
