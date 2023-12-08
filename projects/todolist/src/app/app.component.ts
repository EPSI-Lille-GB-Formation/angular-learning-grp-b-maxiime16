import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TODOS} from "./mock-todo";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<div class="container"><h1>Liste des choses à faire :</h1><ul><li>{{todoList[0].title}}</li><li>{{todoList[1].title}}</li><li>{{todoList[2].title}}</li><li>{{todoList[3].title}}</li><li>{{todoList[4].title}}</li><li>{{todoList[5].title}}</li><li>{{todoList[6].title}}</li><li>{{todoList[7].title}}</li><li>{{todoList[8].title}}</li><li>{{todoList[9].title}}</li></ul></div>',
  styles: [] 
})
export class AppComponent {

  todoList = TODOS

  constructor(){
    console.table(this.todoList);
  }
}
