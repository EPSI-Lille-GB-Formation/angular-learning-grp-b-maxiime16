// user.service.ts

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { USERS } from '../mocks/mock-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getCurrentUserName$(currentUserId$: Observable<number | null>): Observable<string | null> {
    return currentUserId$.pipe(
      map((userId) => USERS.find((u) => u.id === userId)?.firstName || null)
    );
  }

  getCurrentUserFirstName$(currentUserId$: Observable<number | null>): Observable<string | null> {
    return currentUserId$.pipe(
      map((userId) => USERS.find((u) => u.id === userId)?.lastName || null)
    );
  }
}
