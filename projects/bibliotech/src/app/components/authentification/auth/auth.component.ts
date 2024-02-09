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
  isLoggedIn$: Observable<boolean>;
  currentUserId$: Observable<number | null>;
  currentUserRole$: Observable<string | null>;
  currentUserName$: string | null = null;
  currentUserFirstName$: string | null = null;

  isDropdownOpen = false;

  constructor(
    private router: Router,
    private shared: ShareService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.isLoggedIn$ = new Observable<boolean>();
    this.currentUserId$ = new Observable<number | null>();
    this.currentUserRole$ = new Observable<string | null>();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.shared.isLoggedIn$;
    this.currentUserId$ = this.shared.currentUserId$;
    this.currentUserRole$ = this.shared.currentUserRole$;

    this.currentUserId$.subscribe((userId) => {
      if (userId !== null) {
        this.userService
          .getCurrentUserNameFromId(userId)
          .subscribe((userName) => (this.currentUserName$ = userName));

        this.userService
          .getCurrentUserFirstNameFromId(userId)
          .subscribe((firstName) => (this.currentUserFirstName$ = firstName));
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
    this.currentUserId$.subscribe((userId) => {
      if (userId !== null) {
        this.router.navigate(['/user', userId]);
      }
    });
  }

  goToSignInPage() {
    this.router.navigate(['/sign-in']);
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

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}