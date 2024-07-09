import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalForBoardComponent } from '../../addingAndEdtingNewBoard/modal-for-board/modal-for-board.component';
import { Board, BoardElement } from '../../shared/boardInterface';
import { BoardStateService } from '../../shared/board-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-for-boards',
  templateUrl: './nav-for-boards.component.html',
  styleUrl: './nav-for-boards.component.scss',
})
export class NavForBoardsComponent implements OnInit {
  constructor(
    private boardState: BoardStateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  readonly dialog = inject(MatDialog);
  activeBoard!: number;

  allBoards: Board = this.boardState.allSharedBoard;
  openAddBoardDialog() {
    this.dialog.open(ModalForBoardComponent);
  }
  onBoard(index: number) {
    this.activeBoard = index;
    this.router.navigate(['/home', index]);
  }
  ngOnInit(): void {
    this.boardState.sendingBoardToElements.subscribe((board: BoardElement) => {
      this.allBoards.boards.push(board);
    });
  }
}
