import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private currentUserIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public currentUserId$: Observable<number | null> = this.currentUserIdSubject.asObservable();

  private currentUserRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public currentUserRole$: Observable<string | null> = this.currentUserRoleSubject.asObservable();

  setLoggedIn(value: boolean, userId: number | null, userRole: string | null): void {
    this.isLoggedInSubject.next(value);
    this.currentUserIdSubject.next(userId);
    this.currentUserRoleSubject.next(userRole);
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setCurrentUserId(userId: number | null): void {
    this.currentUserIdSubject.next(userId);
  }

  getCurrentUserId(): number | null {
    return this.currentUserIdSubject.value;
  }

  getCurrentUserRole(): string | null {
    return this.currentUserRoleSubject.value;
  }
}
