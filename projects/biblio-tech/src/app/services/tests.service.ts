// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestsService implements InMemoryDbService {
  constructor(private http: HttpClient) {}

  createDb() {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
    return { users };
  }

  addUser(user: { id?: number, name: string }): Observable<any> {
    return this.http.post('/api/users', user);
  }
}
