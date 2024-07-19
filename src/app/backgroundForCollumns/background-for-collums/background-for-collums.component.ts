import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BoardStateService } from '../../shared/board-state.service';

@Component({
  selector: 'app-background-for-collums',
  templateUrl: './background-for-collums.component.html',
  styleUrl: './background-for-collums.component.scss',
})
export class BackgroundForCollumsComponent {
  constructor(private cd: ChangeDetectorRef) {}
  boardState = inject(BoardStateService);
  onAddTask() {
    console.log('hello');
  }
}
