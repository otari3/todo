import { Component, inject } from '@angular/core';
import { BoardElement, Column, Task } from '../../shared/boardInterface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardStateService } from '../../shared/board-state.service';
import { MatDialogRef } from '@angular/material/dialog';
import ObjectID from 'bson-objectid';

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
  board = new FormGroup({
    _id: new FormControl<string>(new ObjectID().toHexString()),
    name: new FormControl<string>('', Validators.required),
    columns: new FormArray<any>([
      new FormGroup({
        name: new FormControl<string>('', Validators.required),
        tasks: new FormControl<Task[]>([]),
      }),
    ]),
  });
  get columns() {
    return this.board.get('columns') as FormArray;
  }
  onAddNewCollum() {
    if (this.columns.length != 3) {
      this.columns.push(
        new FormGroup({
          name: new FormControl<string>('', Validators.required),
          tasks: new FormControl<Task[]>([]),
        })
      );
    }
  }
  get boardElement() {
    const Board: any = {
      _id: this.board.get('_id')?.value,
      name: this.board.get('name')?.value,
      columns: this.board.get('columns')?.value,
    };
    return Board;
  }
  removeingCollum(index: number) {
    this.columns.removeAt(index);
  }
  onCreatNewBoard() {
    this.boardState.sendingBoardToElements.next(this.boardElement);
    this.dialogref.close();
  }
  generetObjectId(): string {
    return new ObjectID().toHexString();
  }
}
