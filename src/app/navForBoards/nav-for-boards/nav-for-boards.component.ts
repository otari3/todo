import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalForBoardComponent } from '../../addingAndEdtingNewBoard/modal-for-board/modal-for-board.component';
import { Board, BoardElement } from '../../shared/boardInterface';

@Component({
  selector: 'app-nav-for-boards',
  templateUrl: './nav-for-boards.component.html',
  styleUrl: './nav-for-boards.component.scss',
})
export class NavForBoardsComponent {
  constructor() {}
  readonly dialog = inject(MatDialog);
  openAddBoardDialog() {
    this.dialog.open(ModalForBoardComponent);
  }
}
