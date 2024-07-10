import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoardStateService } from './board-state.service';

@Injectable({
  providedIn: 'root',
})
export class ApicallsService {
  getBoard() {
    return new Promise<void>((res, rej) => {
      this.http.get('../assets/data.json').subscribe((data: any) => {
        this.boardState.allSharedBoard = data;
        res();
      });
    });
  }
  constructor(
    private http: HttpClient,
    private boardState: BoardStateService
  ) {}
}
