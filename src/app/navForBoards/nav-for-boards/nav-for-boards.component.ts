import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalForBoardComponent } from '../../addingAndEdtingNewBoard/modal-for-board/modal-for-board.component';
import { Board, BoardElement } from '../../shared/boardInterface';
import { BoardStateService } from '../../shared/board-state.service';

@Component({
  selector: 'app-nav-for-boards',
  templateUrl: './nav-for-boards.component.html',
  styleUrl: './nav-for-boards.component.scss',
})
export class NavForBoardsComponent implements OnInit {
  constructor(private boardState: BoardStateService) {}
  readonly dialog = inject(MatDialog);
  activeBoard!: number;

  allBoards: Board = this.boardState.allSharedBoard;
  openAddBoardDialog() {
    this.dialog.open(ModalForBoardComponent);
  }
  onBoard(index: number) {
    this.activeBoard = index;
  }
  ngOnInit(): void {
    this.boardState.sendingBoardToElements.subscribe((board: BoardElement) => {
      this.allBoards.boards.push(board);
    });
  }
}
