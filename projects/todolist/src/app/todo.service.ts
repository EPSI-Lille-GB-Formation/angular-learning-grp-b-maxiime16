import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl: string = 'api/todos'

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(){
    return this.http.get<Todo[]>(this.todosUrl).pipe(
        tap(todoList =>console.log(todoList)),
        catchError(error =>{
            console.log(error);
            return of([]);
        })
    )
  }
  getTodoById(todoId: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.todosUrl}/${todoId}`).pipe(
      catchError(error => {
        console.log(error);
        return of ()
      })
    )
  }
  deleteTodoById(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.todosUrl}/${todoId}`).pipe(
      tap(() => console.log(`Tâche avec l'ID ${todoId} supprimée`)),
      catchError(error => {
        console.log(error);
        return of();
      })
    );
  }

}