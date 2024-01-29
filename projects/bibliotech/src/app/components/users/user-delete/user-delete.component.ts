import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css',
})
export class UserDeleteComponent implements OnInit {
  user: User | undefined;

  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('idUser');

    if (idUser) {
      this.userService.getUserById(+idUser).subscribe(
        (user: User | undefined) => {
          this.user = user;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deleteUserButton() {
    if (this.user) {
      this.userService.deleteUser(this.user.id).subscribe(
        () => {
          this.deleteSuccess = true;
          this.deleteError = false;

          setTimeout(() => {
            this.router.navigate(['']);
          }, 1000);
        },
        (error) => {
          console.error(error);
          this.deleteSuccess = false;
          this.deleteError = true;
        }
      );
    }
  }
  cancelButton() {
    this.router.navigate(['']);
  }
}
