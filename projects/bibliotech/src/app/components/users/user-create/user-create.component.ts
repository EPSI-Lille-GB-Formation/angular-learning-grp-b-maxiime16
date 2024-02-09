import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent {
  user: User | undefined;
  ajoutReussi: boolean = false;
  ajoutError: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  userForm: FormGroup = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.getUsers().subscribe(
        (users: User[]) => {
          const newUser: User = {
            id: this.userService.genIdUser(users),
            firstName: this.userForm.get('firstName')?.value,
            lastName: this.userForm.get('lastName')?.value,
            email: this.userForm.get('email')?.value,
            password: this.userForm.get('password')?.value,
            role: this.userForm.get('role')?.value,
          };

          this.userService.createUser(newUser).subscribe(() => {
            this.ajoutReussi = true;
            this.ajoutError = false;

            setTimeout(() => {
              this.router.navigate(['admin']);
            }, 1000);
          });
        },
        (error: any) => {
          console.error(error);
          this.ajoutReussi = false;
          this.ajoutError = true;
        }
      );
    }
  }
  cancelButton() {
    this.router.navigate(['admin']);
  }
}
