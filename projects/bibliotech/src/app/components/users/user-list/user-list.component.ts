import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  userList: Observable<User[]> = new Observable<User[]>();

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userList = this.userService.getUsers();      
  }

  GoToUserCreatePage(){
    this.router.navigate(['user/create']);
  }
}
