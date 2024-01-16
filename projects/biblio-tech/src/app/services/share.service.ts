import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  // BehaviorSubject pour suivre l'état de connexion
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  // Observable exposant l'état de connexion
  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();

  // BehaviorSubject pour suivre l'ID de l'utilisateur actuel
  private currentUserIdSubject: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);
  // Observable exposant l'ID de l'utilisateur actuel
  public currentUserId$: Observable<number | null> =
    this.currentUserIdSubject.asObservable();

  // BehaviorSubject pour suivre le rôle de l'utilisateur actuel
  private currentUserRoleSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  // Observable exposant le rôle de l'utilisateur actuel
  public currentUserRole$: Observable<string | null> =
    this.currentUserRoleSubject.asObservable();

  // Fonction pour mettre à jour l'état de connexion, l'ID utilisateur et le rôle utilisateur
  setLoggedIn(
    value: boolean,
    userId: number | null,
    userRole: string | null
  ): void {
    this.isLoggedInSubject.next(value);
    this.currentUserIdSubject.next(userId);
    this.currentUserRoleSubject.next(userRole);
  }

  // Getter pour l'état de connexion actuel
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Fonction pour mettre à jour l'ID de l'utilisateur actuel
  setCurrentUserId(userId: number | null): void {
    this.currentUserIdSubject.next(userId);
  }

  // Fonction pour récupérer l'ID de l'utilisateur actuel
  getCurrentUserId(): number  {
    return this.currentUserIdSubject.value || 0; // Utilisez une valeur par défaut (0 dans cet exemple) si la valeur actuelle est nulle
  }

  // Fonction pour récupérer le rôle de l'utilisateur actuel
  getCurrentUserRole(): string | null {
    return this.currentUserRoleSubject.value;
  }
}
