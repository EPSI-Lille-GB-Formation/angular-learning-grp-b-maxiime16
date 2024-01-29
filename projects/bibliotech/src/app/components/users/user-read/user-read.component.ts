import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-read',
  standalone: true,
  imports: [],
  templateUrl: './user-read.component.html',
  styleUrl: './user-read.component.css',
})
export class UserReadComponent implements OnInit {
  UserRead: User | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('idUser');

    if (idUser) {
      this.userService.getUserById(+idUser).subscribe(
        (user: User | undefined) => {
          this.UserRead = user;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  GoToDeletePage(idUser: number | undefined): void {
    this.router.navigate(['user/delete', idUser]);
  }

  GoToUpdatePage(idUser: number | undefined): void {
    this.router.navigate(['user/update', idUser]);
  }
}
