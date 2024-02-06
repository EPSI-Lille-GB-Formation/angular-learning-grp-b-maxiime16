import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ShareService } from '../../../services/share.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})

export class AuthComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  currentUserId$: Observable<number | null> = new Observable<number | null>();
  currentUserRole$: Observable<string | null> = new Observable<string | null>();
  currentUserName$: string | null = null;
  currentUserFirstName$: string | null = null;

  constructor(
    private router: Router,
    private shared: ShareService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.shared.isLoggedIn$;
    this.currentUserId$ = this.shared.currentUserId$;
    this.currentUserRole$ = this.shared.currentUserRole$;

    this.currentUserId$.subscribe((userId: number | null) => {
      if (userId !== null) {
        this.userService
          .getCurrentUserNameFromId(userId)
          .subscribe(
            (userName: string | null) => (this.currentUserName$ = userName)
          );

        this.userService
          .getCurrentUserFirstNameFromId(userId)
          .subscribe(
            (firstName: string | null) =>
              (this.currentUserFirstName$ = firstName)
          );
      }
    });
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
  goToHomePage() {
    this.router.navigate(['']);
  }

  goToUserReadPage(): void {
    this.currentUserId$.subscribe((userId: number | null) => {
      if (userId !== null) {
        this.router.navigate(['/user', userId]);
      }
    });
  }

  goToAdminPage() {
    this.router.navigate(['admin']);
  }

  logout(): void {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }
}
