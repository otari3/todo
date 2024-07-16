import { Component, inject } from '@angular/core';
import { BoardStateService } from '../../shared/board-state.service';

@Component({
  selector: 'app-background-for-collums',
  templateUrl: './background-for-collums.component.html',
  styleUrl: './background-for-collums.component.scss',
})
export class BackgroundForCollumsComponent {
  boardState = inject(BoardStateService);
  onAddTask() {
    console.log('hello');
  }
}
