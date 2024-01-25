import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { InMemoryDataService } from '../services/in-memory-data.service';
import { ShareService } from '../../../../biblio-tech/src/app/services/share.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private inMemoryDataService: InMemoryDataService,
    private sharedService: ShareService
  ) {}

  // Fonction de connexion utilisateur
  // Retourne un observable contenant l'utilisateur authentifié ou null si l'authentification échoue
  login(user: User): Observable<User | null> {
    // Récupère la liste des utilisateurs à partir du service InMemoryDataService
    const users: User[] = this.inMemoryDataService.createDb().users;

    // Recherche de l'utilisateur dans la liste en fonction de l'email et du mot de passe fournis
    const authenticatedUser = users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    // Si un utilisateur est authentifié
    if (authenticatedUser) {
      // Met à jour le service de partage avec l'état connecté et les informations de l'utilisateur
      this.sharedService.setLoggedIn(
        true,
        authenticatedUser.id,
        authenticatedUser.role
      );
      console.log('Auth.service - isLoggedIn:', this.sharedService.isLoggedIn);

      // Retourne l'utilisateur authentifié via un observable
      return of(authenticatedUser);
    } else {
      // Si l'authentification échoue, met à jour le service de partage avec l'état déconnecté
      this.sharedService.setLoggedIn(false, null, null);
      console.log('Auth.service - isLoggedIn:', false);

      // Retourne null via un observable
      return of(null);
    }
  }

  // Fonction de déconnexion utilisateur
  // Met à jour le service de partage avec l'état déconnecté
  logout(): void {
    this.sharedService.setLoggedIn(false, null, null);
    console.log('Auth.service - isLoggedIn:', false);
  }
}
