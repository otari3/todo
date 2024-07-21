import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../shared/boardInterface';
import { Subject } from 'rxjs';
import { BoardStateService } from '../../shared/board-state.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  constructor(private boardState: BoardStateService) {}
  @Input() task!: Task;
  @Output() void = new EventEmitter<void>();
  sending() {
    this.void.emit();
  }
}
