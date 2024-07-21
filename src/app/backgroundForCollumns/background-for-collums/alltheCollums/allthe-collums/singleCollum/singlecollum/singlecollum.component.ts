import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../../../../../../shared/boardInterface';
import { BoardStateService } from '../../../../../../shared/board-state.service';

@Component({
  selector: 'app-singlecollum',
  templateUrl: './singlecollum.component.html',
  styleUrl: './singlecollum.component.scss',
})
export class SinglecollumComponent {
  constructor(private boardstate: BoardStateService) {}
  @Input() column!: Column;
  loging(event: void) {
    console.log(this.column);
  }
}
