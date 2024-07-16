import { Component, Input } from '@angular/core';
import { Task } from '../../shared/boardInterface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input() task!: Task;
}
