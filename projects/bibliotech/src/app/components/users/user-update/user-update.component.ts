import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ShareService } from '../../../services/share.service';


@Component({
  selector: 'app-user-update',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  user: User | undefined;
  isAdmin: boolean = false; // Ajoutez une variable pour stocker le statut de l'utilisateur

  userForm: FormGroup = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    oldPassword: ['', Validators.required],
    newPassword: '',
    role: '',
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private shareService: ShareService // Injectez le service ShareService
  ) {}

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('idUser');

    if (idUser) {
      this.userService.getUserById(+idUser).subscribe(
        (user) => {
          this.user = user;
          // Vérifiez si l'utilisateur est admin
          this.isAdmin = this.shareService.getCurrentUserRole() === 'admin';
        }
      );
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      // Vérification de l'ancien mot de passe
      if (this.userForm.value.oldPassword !== this.user?.password) {
        this.userForm.get('oldPassword')?.setErrors({ incorrect: true });
        return;
      }

      const updatedUser: User = {
        ...this.user!,
        firstName: this.userForm.value.firstName || this.user!.firstName,
        lastName: this.userForm.value.lastName || this.user!.lastName,
        email: this.userForm.value.email || this.user!.email,
        password: this.userForm.value.newPassword,
        role: this.userForm.value.role || this.user!.role,
      };
      this.userService.updateUser(updatedUser).subscribe(
        () => {
          const idUser = this.route.snapshot.paramMap.get('idUser');
          setTimeout(() => {
            this.router.navigate(['user', idUser]);
          });
        }
      );
    }
  }

  cancelButton(): void {
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.router.navigate(['user', idUser]);
  }
}
