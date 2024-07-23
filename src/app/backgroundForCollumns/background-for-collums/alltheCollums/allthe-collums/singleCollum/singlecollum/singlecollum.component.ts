import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Column } from '../../../../../../shared/boardInterface';
import { BoardStateService } from '../../../../../../shared/board-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-singlecollum',
  templateUrl: './singlecollum.component.html',
  styleUrl: './singlecollum.component.scss',
})
export class SinglecollumComponent implements OnInit, OnDestroy {
  constructor(private boardstate: BoardStateService) {}
  @Input() column!: Column;
  unSubingOnDestory!: Subscription;
  loging(event: void) {}
  ngOnInit(): void {
    this.unSubingOnDestory = this.boardstate.sendingTasks.subscribe((task) => {
      if (task.status === this.column.name) {
        this.column.tasks.push(task);
      }
    });
  }
  ngOnDestroy(): void {
    this.unSubingOnDestory.unsubscribe();
  }
}
