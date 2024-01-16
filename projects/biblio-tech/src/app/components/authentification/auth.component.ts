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
              Vous êtes connecté, bonjour {{ currentUserName$ | async }}
              {{ currentUserFirstName$ | async }}
            </p>
            <p>role: ({{ currentUserRole$ | async }})</p>
          </div>
          <div>
            <button>Voir profil</button>
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
  currentUserName$: Observable<string | null> = new Observable<string | null>(); // Ajoutez la propriété pour le nom d'utilisateur
  currentUserFirstName$: Observable<string | null> = new Observable<string | null>(); // Ajoutez la propriété pour le prénom

  constructor(
    private router: Router,
    private shared: ShareService,
    private authService: AuthService,
    private userService: UserService // Ajoutez le service d'utilisateur
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.shared.isLoggedIn$;
    this.currentUserId$ = this.shared.currentUserId$;
    this.currentUserRole$ = this.shared.currentUserRole$;

    // Utilisez le service d'utilisateur pour obtenir les noms d'utilisateur
    this.currentUserName$ = this.userService.getCurrentUserName$(this.currentUserId$);
    this.currentUserFirstName$ = this.userService.getCurrentUserFirstName$(this.currentUserId$);
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1500);
  }
}
