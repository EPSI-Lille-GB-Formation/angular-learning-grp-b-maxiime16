import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { InMemoryDataService } from '../services/in-memory-data.service';
import { ShareService } from './share.service';  // Import correct du service ShareService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private inMemoryDataService: InMemoryDataService,
    private sharedService: ShareService  // Utilisation du même service ici
  ) {}

  login(user: User): Observable<User | null> {
    const users: User[] = this.inMemoryDataService.createDb().users;

    const authenticatedUser = users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (authenticatedUser) {
      this.sharedService.setLoggedIn(
        true,
        authenticatedUser.id,
        authenticatedUser.role
      );
      console.log('Auth.service - isLoggedIn:', this.sharedService.isLoggedIn);

      return of(authenticatedUser);
    } else {
      this.sharedService.setLoggedIn(false, null, null);
      console.log('Auth.service - isLoggedIn:', false);

      return of(null);
    }
  }

  logout(): void {
    this.sharedService.setLoggedIn(false, null, null);
    console.log('Auth.service - isLoggedIn:', false);
  }

  checkUserExistence(email: string): Observable<boolean> {
    const users: User[] = this.inMemoryDataService.createDb().users;
    const userExists = users.some((u) => u.email === email);
    return of(userExists);
  }

  register(user: User): Observable<User | null> {
    const users: User[] = this.inMemoryDataService.createDb().users;

    const userExists = users.some((u) => u.email === user.email);

    if (userExists) {
      return of(null);
    } else {
      users.push(user);
      this.sharedService.setLoggedIn(true, user.id, user.role);
      console.log('Auth.service - isLoggedIn:', this.sharedService.isLoggedIn);
      return of(user);
    }
  }
}
