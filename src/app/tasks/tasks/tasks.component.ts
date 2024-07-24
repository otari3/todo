import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../shared/boardInterface';
import { Subject } from 'rxjs';
import { BoardStateService } from '../../shared/board-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ModulForAddingTasksComponent } from '../../modulForAddinTasks/modul-for-adding-tasks/modul-for-adding-tasks.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  constructor(
    private boardState: BoardStateService,
    private matDialog: MatDialog
  ) {}
  @Input() task!: Task;
  @Output() void = new EventEmitter<void>();
  sending() {
    this.void.emit();
  }
  onEdit() {
    this.matDialog.open(ModulForAddingTasksComponent);
    setTimeout(() => {
      this.boardState.sendingEditTask.next(this.task);
    }, 0);
  }
}
