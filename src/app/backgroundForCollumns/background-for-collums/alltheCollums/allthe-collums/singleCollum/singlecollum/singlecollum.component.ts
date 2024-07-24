import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Column, Task } from '../../../../../../shared/boardInterface';
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
  unSubingFromOnUpdate!: Subscription;
  loging(event: void) {}
  findingTask(id: Task['_id']) {
    let index = this.column.tasks.findIndex((t) => {
      return t._id === id;
    });
    return index;
  }
  updatingTask(
    chagne: {
      status: Task['status'];
      isChanged: boolean;
      _id: Task['_id'];
    },
    task: Task
  ) {
    if (chagne.isChanged && task.status === this.column.name) {
      this.column.tasks.push(task);
    } else if (chagne.isChanged && chagne.status === this.column.name) {
      let index = this.findingTask(task._id);
      this.column.tasks.splice(index, 1);
    } else if (!chagne.isChanged && chagne.status === this.column.name) {
      let index = this.findingTask(task._id);
      this.column.tasks[index] = task;
    }
  }
  ngOnInit(): void {
    this.unSubingOnDestory = this.boardstate.sendingTasks.subscribe((task) => {
      if (task.status === this.column.name) {
        this.column.tasks.push(task);
      }
    });
    this.unSubingFromOnUpdate = this.boardstate.gettingUpdatedTask.subscribe(
      (data) => {
        this.updatingTask(data[0], data[1]);
      }
    );
  }
  ngOnDestroy(): void {
    this.unSubingOnDestory.unsubscribe();
    this.unSubingFromOnUpdate.unsubscribe();
  }
}
