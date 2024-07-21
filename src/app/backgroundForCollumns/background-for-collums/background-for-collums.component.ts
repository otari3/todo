import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BoardStateService } from '../../shared/board-state.service';

@Component({
  selector: 'app-background-for-collums',
  templateUrl: './background-for-collums.component.html',
  styleUrl: './background-for-collums.component.scss',
})
export class BackgroundForCollumsComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}
  boardState = inject(BoardStateService);
  lengthOfColumn = 0;
  onAddTask() {
    console.log('hello');
  }
  ngOnInit(): void {
    this.boardState.gettingLengthOfColumn.subscribe((data: number) => {
      this.lengthOfColumn = data;
      this.cd.detectChanges();
    });
  }
}
