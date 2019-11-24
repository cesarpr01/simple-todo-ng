import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-todo-checkbox',
  templateUrl: './todo-checkbox.component.html',
  styleUrls: ['./todo-checkbox.component.scss']
})
export class TodoCheckboxComponent {
  @Input() checked: boolean;

  @Output() changed: EventEmitter<boolean>;

  id: string;

  constructor() {
    this.id = `todo-checkbox-${Math.trunc(Math.random() * 100000)}`; // this could potentially collision, but no matter for this exercise
    this.checked = false;
    this.changed = new EventEmitter();
  }

  change(checked: boolean): void {
    this.changed.emit(checked);
  }
}
