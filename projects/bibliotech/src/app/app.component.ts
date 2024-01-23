import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template:`
  <div class="container">
    <button (click)="GoToHomePage()">Accueil</button>
    <router-outlet></router-outlet>
  </div>
  ` ,
  styles:[],
})
export class AppComponent {
  title = 'bibliotech';

  constructor(
    private router: Router,
  ){}

  GoToHomePage(){
    this.router.navigate(['']);
  }
  
}
