import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board, BoardElement } from './boardInterface';

@Injectable({
  providedIn: 'root',
})
export class BoardStateService {
  sendingBoardToElements = new Subject<BoardElement>();
  allSharedBoard: Board = { boards: [] };
  constructor() {}
}
