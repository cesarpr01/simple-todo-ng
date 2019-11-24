import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Todo {
  id: number;
  description: string;
  completed?: boolean;
  dateCompleted?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos: Todo[];
  private incomplete: BehaviorSubject<Todo[]>;
  private complete: BehaviorSubject<Todo[]>;


  constructor(private storageService: StorageService) {
    this.incomplete = new BehaviorSubject([]);
    this.complete = new BehaviorSubject([]);

    const existingTodos = storageService.get<Todo[]>('todos') || [];
    this.updateTodos(existingTodos);
  }

  addTodo(description: string): Todo {
    const trimmedDesc = description.substring(0, 150);

    const todo = {
      id: this.nextId(),
      description: trimmedDesc,
      completed: false
    };

    this.updateTodos([todo, ...this.todos]);

    return todo;
  }

  removeTodo(id: number): void {
    this.doAction(id, (todo, idx, todos) => {
      return [
        ...todos.slice(0, idx),
        ...todos.slice(idx + 1)
      ];
    });
  }

  completeTodo(id: number): void {
    this.setCompleteState(id, true);
  }

  uncompleteTodo(id: number) {
    this.setCompleteState(id, false);
  }

  getCompleted(): Observable<Todo[]> {
    return this.complete.asObservable();
  }

  getIncompleted(): Observable<Todo[]> {
    return this.incomplete.asObservable();
  }

  clearAllTodo(): void {
    this.clearTodos(false);
  }

  clearAllDone(): void {
    this.clearTodos(true);
  }

  private nextId(): number {
    let currentId = this.storageService.get<number>('id') || 0;
    currentId += 1;
    this.storageService.set('id', currentId);

    return currentId;
  }

  private saveChanges(): void {
    this.storageService.set('todos', this.todos);
  }

  private doAction(id: number, action: (todo: Todo, idx: number, todos: Todo[]) => Todo[]): void {
    const index = this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];

    if (index === -1) {
      return;
    }

    this.updateTodos(action(todo, index, this.todos));
  }

  private setCompleteState(id: number, state: boolean): void {
    this.doAction(id, (todo, idx, todos) => {
      return [
        ...todos.slice(0, idx),
        { ...todo, completed: state },
        ...todos.slice(idx + 1)
      ];
    });
  }

  private clearTodos(completeStatus: boolean): void {
    const cleared = this.todos.reduce((accumulator, todo) => {
      if (todo.completed !== completeStatus) {
        accumulator.push(todo);
      }

      return accumulator;
    }, []);

    this.updateTodos(cleared);
  }

  private updateTodos(todos: Todo[]): void {
    this.todos = todos;
    this.saveChanges();

    this.complete.next(this.todos.filter(todo => todo.completed));
    this.incomplete.next(this.todos.filter(todo => !todo.completed));
  }
}
