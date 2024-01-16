import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TodoList_Component} from './components/todo-list/todo-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  TodoList_Component],
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})

export class AppComponent {
  constructor(){ }

}
