import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board, BoardElement, Column, Task } from './boardInterface';

@Injectable({
  providedIn: 'root',
})
export class BoardStateService {
  currentlyLoadBoard!: BoardElement;
  sendingBoardToElements = new Subject<BoardElement>();
  boardEdit = new Subject<BoardElement>();
  allSharedBoard: Board = { boards: [] };
  corruntLoadedCollumn: Column[] = [];
  sendingColumn = new Subject<Column>();
  gettingLengthOfColumn = new Subject<number>();
  sendingTasks = new Subject<Task>();
  sendingEditTask = new Subject<Task>();
  finishedBoardEdit = new Subject<BoardElement>();
  gettingUpdatedTask = new Subject<
    [
      {
        status: Task['status'];
        isChanged: boolean;
        _id: Task['_id'];
      },
      Task
    ]
  >();
  constructor() {}
}
