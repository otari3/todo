import { Component, OnInit } from '@angular/core';
import { Column } from '../../../../shared/boardInterface';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardStateService } from '../../../../shared/board-state.service';

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
  ngOnInit(): void {
    this.activtedRouter.params.subscribe((data: Params) => {
      this.columns =
        this.boarderState.allSharedBoard.boards[Number(data['id'])].columns;
      this.boarderState.corruntLoadedCollumn = this.columns;
    });
  }
}
