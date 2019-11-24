import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { TodosService } from './todos.service';
import { Subscription } from 'rxjs';

describe('TodosService', () => {
  let subscriptions: Subscription[] = [];

  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(() => {
    subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });

    subscriptions = [];
    localStorage.clear();
  });

  it('should be created', () => {
    const service: TodosService = TestBed.get(TodosService);
    expect(service).toBeTruthy();
  });

  it('should add todo', () => {
    const service: TodosService = TestBed.get(TodosService);
    const added = service.addTodo('a new todo');

    expect(added).toBeDefined();
    expect(added.id).toBeGreaterThan(0);
  });

  it('should remove todo', () => {
    const service: TodosService = TestBed.get(TodosService);

    let incompleteLength = 0;
    subscriptions.push(service.getIncompleted()
      .subscribe(incomplete => {
        expect(incomplete.length).toBe(incompleteLength);
      })
    );

    incompleteLength = 1;
    const added = service.addTodo('a new todo');

    incompleteLength = 0;
    service.removeTodo(added.id);
  });

  it('should complete todo', () => {
    const service: TodosService = TestBed.get(TodosService);

    let incompleteLength = 0;
    subscriptions.push(service.getIncompleted()
      .subscribe(incomplete => {
        expect(incomplete.length).toBe(incompleteLength);
      })
    );

    incompleteLength = 1;
    const added = service.addTodo('a new todo');

    let completeLength = 0;
    subscriptions.push(service.getCompleted()
      .subscribe(complete => {
        expect(complete.length).toBe(completeLength);
      })
    );

    incompleteLength = 0;
    completeLength = 1;
    service.completeTodo(added.id);
  });

  it('should uncomplete todo', () => {
    const service: TodosService = TestBed.get(TodosService);

    let incompleteLength = 0;
    subscriptions.push(service.getIncompleted()
      .subscribe(incomplete => {
        expect(incomplete.length).toBe(incompleteLength);
      })
    );

    let completeLength = 0;
    subscriptions.push(service.getCompleted()
      .subscribe(complete => {
        expect(complete.length).toBe(completeLength);
      })
    );

    incompleteLength = 1;
    const added = service.addTodo('a new todo');

    incompleteLength = 0;
    completeLength = 1;
    service.completeTodo(added.id);

    incompleteLength = 1;
    completeLength = 0;
    service.uncompleteTodo(added.id);
  });
});
