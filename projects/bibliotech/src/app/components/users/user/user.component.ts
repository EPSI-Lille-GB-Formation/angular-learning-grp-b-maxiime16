import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(private router: Router) {}

  @Input('value')
  user: User | undefined;

  GoToUpdateUserPage(idUser: number): void {
    this.router.navigate(['user/update', idUser]);
  }

  GoToDeleteUserPage(idUser: number): void {
    this.router.navigate(['user/delete', idUser]);
  }
}
