import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../../../../../../shared/boardInterface';
import { BoardStateService } from '../../../../../../shared/board-state.service';

@Component({
  selector: 'app-singlecollum',
  templateUrl: './singlecollum.component.html',
  styleUrl: './singlecollum.component.scss',
})
export class SinglecollumComponent implements OnInit {
  constructor(private boardstate: BoardStateService) {}
  @Input() column!: Column;
  loging(event: void) {
    console.log(this.column);
  }
  ngOnInit(): void {
    this.boardstate.sendingTasks.subscribe((task) => {
      if (task.status === this.column.name) {
        this.column.tasks.push(task);
      }
    });
  }
}
