import { Component, OnDestroy, OnInit } from '@angular/core';
import { Column, Task } from '../../shared/boardInterface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardStateService } from '../../shared/board-state.service';
import { MatDialogRef } from '@angular/material/dialog';
import ObjectID from 'bson-objectid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-for-board',
  templateUrl: './modal-for-board.component.html',
  styleUrl: './modal-for-board.component.scss',
})
export class ModalForBoardComponent implements OnInit, OnDestroy {
  constructor(
    private boardState: BoardStateService,
    private dialogref: MatDialogRef<ModalForBoardComponent>
  ) {}
  boardEditMemoryLeak!: Subscription;
  boardIsInEdit = false;
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
    if (!this.boardIsInEdit) {
      this.boardState.sendingBoardToElements.next(this.boardElement);
    } else {
      this.boardState.finishedBoardEdit.next(this.boardElement);
    }
    this.dialogref.close();
  }
  generetObjectId(): string {
    return new ObjectID().toHexString();
  }
  addingColumns(cl: Column[]) {
    for (let i = 1; i < cl.length; i++) {
      this.columns.push(
        new FormGroup({
          name: new FormControl<any>(cl[i].name, Validators.required),
          tasks: new FormControl<Task[]>(cl[i].tasks),
        })
      );
    }
  }
  ngOnInit(): void {
    this.boardEditMemoryLeak = this.boardState.boardEdit.subscribe((board) => {
      this.boardIsInEdit = true;
      this.board.patchValue({
        _id: board._id,
        name: board.name,
        columns: board.columns,
      });
      this.addingColumns(board.columns);
    });
  }
  ngOnDestroy(): void {
    this.boardEditMemoryLeak.unsubscribe();
  }
}
