import { Component } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Todo } from '../../todo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'task',
  standalone: true,
  imports: [],
  template:`
    <h1>Afficher la tâche cliqué</h1>
    <a href="#" role="button" (click)="goToHomePage()">Page d'accueil</a>
    <p>Id: {{this.task?.id}}</p>
    <p>Title: {{this.task?.title}}</p>
    <p>Contenu: {{this.task?.content}}</p>
    <p>Auteur: {{this.task?.author}}</p>
    <p>Date de création: {{this.task?.createdAt}}</p>
    <p>Date d'accomplissement: {{this.task?.completedAt}}</p>
  `,
  styles: []
})
export class TaskComponent {

  task : Todo | undefined

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')

    if (taskId){this.todoService.getTodoById(+taskId).subscribe(task => this.task  = task)
    }
  }
  goToHomePage(){
    this.router.navigate(['']);
  }

}
