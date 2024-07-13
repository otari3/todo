import { Component, OnInit, inject } from '@angular/core';
import { Column } from '../../../../shared/boardInterface';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardStateService } from '../../../../shared/board-state.service';
import { MatDialog } from '@angular/material/dialog';
import { CollunModuleComponent } from '../../../../addingCollunDialog/collun-module/collun-module.component';

@Component({
  selector: 'app-allthe-collums',
  templateUrl: './allthe-collums.component.html',
  styleUrl: './allthe-collums.component.scss',
})
export class AlltheCollumsComponent implements OnInit {
  constructor(
    private activtedRouter: ActivatedRoute,
    private boarderState: BoardStateService
  ) {}
  columns!: Column[];
  readonly dialog = inject(MatDialog);
  onAddNewColumn() {
    this.dialog.open(CollunModuleComponent);
  }
  ngOnInit(): void {
    this.activtedRouter.params.subscribe((data: Params) => {
      this.columns =
        this.boarderState.allSharedBoard.boards[Number(data['id'])].columns;
      this.boarderState.corruntLoadedCollumn = this.columns;
    });
    this.boarderState.sendingColumn.subscribe((col) => {
      this.columns.push(col);
    });
  }
}
