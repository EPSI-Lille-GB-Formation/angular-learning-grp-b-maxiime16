import { Routes } from '@angular/router';
import { TodoList_Component } from './components/todo-list/todo-list.component';
import { TaskComponent } from './components/task/task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';

export const routes: Routes = [
    {path: '', component: TodoList_Component},
    {path: 'task/:id', component: TaskComponent},
    {path: 'task/edit/:id', component: EditTaskComponent},
    {path: 'task/delete/:id', component: DeleteTaskComponent}
];
