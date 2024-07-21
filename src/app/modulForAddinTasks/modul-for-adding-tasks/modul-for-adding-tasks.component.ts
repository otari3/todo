import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import ObjectID from 'bson-objectid';
import { BoardStateService } from '../../shared/board-state.service';
import { Task } from '../../shared/boardInterface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modul-for-adding-tasks',
  templateUrl: './modul-for-adding-tasks.component.html',
  styleUrl: './modul-for-adding-tasks.component.scss',
})
export class ModulForAddingTasksComponent implements OnInit {
  constructor(
    private boartState: BoardStateService,
    private matRef: MatDialogRef<ModulForAddingTasksComponent>
  ) {}
  names: any = [];
  task = new FormGroup({
    _id: new FormControl<string>(new ObjectID().toHexString()),
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    status: new FormControl<string>('Todo'),
    subtasks: new FormArray([
      new FormGroup({
        title: new FormControl<string>(''),
        isCompleted: new FormControl<boolean>(false),
      }),
      new FormGroup({
        title: new FormControl<string>(''),
        isCompleted: new FormControl<boolean>(false),
      }),
    ]),
  });
  get subTask() {
    return this.task.get('subtasks') as FormArray;
  }
  onAddNewSubTask() {
    this.subTask.push(
      new FormGroup({
        title: new FormControl<string>(''),
        isCompleted: new FormControl<boolean>(false),
      })
    );
  }
  deletSubTask(index: number) {
    if (index > 1) {
      this.subTask.removeAt(index);
    }
  }
  onCreatTask() {
    const task: Task = {
      _id: this.task.get('_id')?.value,
      title: this.task.get('title')?.value,
      description: this.task.get('description')?.value,
      status: this.task.get('status')?.value,
      subtasks: this.subTask.value,
    };
    this.boartState.sendingTasks.next(task);
    this.matRef.close();
  }
  ngOnInit(): void {
    for (let items of this.boartState.corruntLoadedCollumn) {
      this.names.push(items.name);
    }
    this.task.patchValue({
      status: this.names[0],
    });
  }
}
