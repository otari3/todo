import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board, BoardElement, Column } from './boardInterface';

@Injectable({
  providedIn: 'root',
})
export class BoardStateService {
  sendingBoardToElements = new Subject<BoardElement>();
  allSharedBoard: Board = { boards: [] };
  corruntLoadedCollumn: Column[] = [];
  sendingColumn = new Subject<Column>();
  gettingLengthOfColumn = new Subject<number>()
  constructor() {}
}
