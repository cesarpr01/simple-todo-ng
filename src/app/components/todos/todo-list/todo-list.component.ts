import { Component, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() headerTitle: string;
  @Input() listRole: 'todo' | 'done';
  @Input() todos: Todo[];

  @Output() todoChecked: EventEmitter<{ todoId: number, checked: boolean }>;
  @Output() deleteTodo: EventEmitter<number>;
  @Output() deleteAll: EventEmitter<void>;

  constructor() {
    this.listRole = 'todo';
    this.todoChecked = new EventEmitter();
    this.deleteTodo = new EventEmitter();
    this.deleteAll = new EventEmitter();
  }

  deleteTodoClicked(todoId: number) {
    this.deleteTodo.emit(todoId);
  }

  deleteAllClicked(): void {
    this.deleteAll.emit();
  }

  checkChanged(checked: boolean, todoId: number): void {
    this.todoChecked.emit({ todoId, checked });
  }
}
