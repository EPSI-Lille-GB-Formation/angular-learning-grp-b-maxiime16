import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-read',
  standalone: true,
  template: `
    <h2>Informations du profil :</h2>
    <div>
      <article>
        <p>Nom : {{ user?.lastName }}</p>
        <p>Prénom : {{ user?.firstName }}</p>
        <p>Email : {{ user?.email }}</p>
        <p>Rôle : {{ user?.role }}</p>
      </article>
    </div>
    <div class="grid">
      <button (click)="goToHomePage()">Accueil</button>
      <button >Modifier profil</button>
    </div>
  `,
  styles: [],
})
export class UserReadComponent implements OnInit {
  user: User | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    const currentUserId = this.activatedRoute.snapshot.params['id'];
    if (currentUserId) {
      this.userService
        .getCurrentUserFromId(+currentUserId)
        .subscribe((userData) => {
          this.user = userData;
        });
    }
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  goToEditUserPage(userId: number | undefined): void {
    if (userId) {
      this.router.navigate(['/user/edit', userId]);
    }
  }
}
