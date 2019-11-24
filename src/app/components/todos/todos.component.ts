import { Component, OnInit } from '@angular/core';
import { TodosService, Todo } from './todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoDescription: string;
  todo: Observable<Todo[]>;
  done: Observable<Todo[]>;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todo = this.todosService.getIncompleted();
    this.done = this.todosService.getCompleted();
  }

  addTodo() {
    this.todosService.addTodo(this.todoDescription);
    this.todoDescription = '';
  }

  todoChecked(event: { todoId: number, checked: boolean }): void {
    const { todoId, checked } = event;

    checked ? this.todosService.completeTodo(todoId) : this.todosService.uncompleteTodo(todoId);
  }

  deleteTodo(todoId: number): void {
    this.todosService.removeTodo(todoId);
  }

  deleteAll(type: 'complete' | 'incomplete'): void {
    switch (type) {
      case 'complete':
        this.todosService.clearAllDone();
        break;
      case 'incomplete':
      default:
        this.todosService.clearAllTodo();
        break;
    }
  }
}
