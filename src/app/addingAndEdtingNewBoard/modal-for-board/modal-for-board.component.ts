import { Component, inject } from '@angular/core';
import { BoardElement, Column } from '../../shared/boardInterface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardStateService } from '../../shared/board-state.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-for-board',
  templateUrl: './modal-for-board.component.html',
  styleUrl: './modal-for-board.component.scss',
})
export class ModalForBoardComponent {
  constructor(
    private boardState: BoardStateService,
    private dialogref: MatDialogRef<ModalForBoardComponent>
  ) {}
  newColumNames: { name?: string }[] = [];
  removedColums: { index: number; name?: string }[] = [];
  board: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });
  onAddNewCollum() {
    if (this.removedColums.length > 0) {
      const lastElement = this.removedColums.pop();
      this.newColumNames[lastElement!.index].name = lastElement?.name;
    } else if (this.newColumNames.length != 3) {
      const newName =
        this.newColumNames.length === 0
          ? 'Todo'
          : this.newColumNames.length === 1
          ? 'Doing'
          : 'Done';
      this.newColumNames.push({ name: newName });
    }
  }
  removeingCollum(index: number) {
    this.removedColums.push({
      index: index,
      name: this.newColumNames[index].name,
    });
    this.newColumNames[index].name = '';
  }
  onCreatNewBoard() {
    const board: BoardElement = {
      name: this.board.get('name')?.value,
      columns: [],
    };
    for (let items of this.newColumNames) {
      if (items.name !== '') {
        board.columns.push({ name: items.name, tasks: [] });
      }
    }
    this.boardState.sendingBoardToElements.next(board);
    this.dialogref.close();
  }
}
