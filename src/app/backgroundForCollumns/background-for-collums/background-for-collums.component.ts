import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BoardStateService } from '../../shared/board-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ModulForAddingTasksComponent } from '../../modulForAddinTasks/modul-for-adding-tasks/modul-for-adding-tasks.component';
import { Column } from '../../shared/boardInterface';

@Component({
  selector: 'app-background-for-collums',
  templateUrl: './background-for-collums.component.html',
  styleUrl: './background-for-collums.component.scss',
})
export class BackgroundForCollumsComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}
  boardState = inject(BoardStateService);
  lengthOfColumn: Column[] = [];
  mDialog = inject(MatDialog);
  onAddTask() {
    this.mDialog.open(ModulForAddingTasksComponent);
  }
  ngOnInit(): void {
    this.boardState.gettingLengthOfColumn.subscribe((data: number) => {
      this.lengthOfColumn = this.boardState.corruntLoadedCollumn;
      this.cd.detectChanges();
    });
  }
}
