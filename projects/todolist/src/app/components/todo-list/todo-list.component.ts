import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TODOS} from '../../../mock-todo';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  template: `
    <h1>Liste des choses à faire :</h1>

    <a href="#" role="button"
    [class.secondary]="!completedFilter && !allList" 
    (click)="onClickTodo()"> A faire</a>
    <a href="#" role="button" 
    [class.secondary]="completedFilter && !allList"
    (click)="onClickTodoCompleted()"> Terminée</a>
    <a href="#" role="button" 
    [class.secondary]="allList"
    (click)="onClickTodoAll()"> Tout afficher</a>

    <ng-container *ngFor="let todo of todoList"> 
      <todo *ngIf="todo.isCompleted === completedFilter || allList"  [value]="todo"/>
    </ng-container>
    
  `,
  styles: []
})

export class TodoList_Component {
  todoList = TODOS;

  completedFilter = false

  allList = false

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this. todoService.getTodoList().subscribe(todos => this. todoList = todos);
    this. todoService.getTodoById(5).subscribe (todo => console.log(todo));

  }

  onClickTodo() {
    this.completedFilter = false;
    this.allList = false;
  }
  onClickTodoCompleted() {
    this.completedFilter = true;
    this.allList = false;
  }
  onClickTodoAll() {
    this.allList = true;
  }

}