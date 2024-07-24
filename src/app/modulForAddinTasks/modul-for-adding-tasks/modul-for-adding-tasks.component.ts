import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import ObjectID from 'bson-objectid';
import { BoardStateService } from '../../shared/board-state.service';
import { Task } from '../../shared/boardInterface';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, pairwise } from 'rxjs';

@Component({
  selector: 'app-modul-for-adding-tasks',
  templateUrl: './modul-for-adding-tasks.component.html',
  styleUrl: './modul-for-adding-tasks.component.scss',
})
export class ModulForAddingTasksComponent implements OnInit, OnDestroy {
  constructor(
    private boartState: BoardStateService,
    private matRef: MatDialogRef<ModulForAddingTasksComponent>
  ) {}
  names: any = [];
  ifStatusChanged: {
    status: Task['status'];
    isChanged: boolean;
    _id: Task['_id'];
  } = {
    status: '',
    isChanged: false,
    _id: '',
  };
  taskGetting!: Subscription;
  editMode = false;
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
  get creatTask() {
    const task: Task = {
      _id: this.task.get('_id')?.value,
      title: this.task.get('title')?.value,
      description: this.task.get('description')?.value,
      status: this.task.get('status')?.value,
      subtasks: this.subTask.value,
    };
    return task;
  }
  onCreatTask() {
    if (!this.editMode) {
      this.boartState.sendingTasks.next(this.creatTask);
    } else {
      this.boartState.gettingUpdatedTask.next([
        this.ifStatusChanged,
        this.creatTask,
      ]);
    }
    this.matRef.close();
  }
  collumnNameUpdates() {
    for (let items of this.boartState.corruntLoadedCollumn) {
      this.names.push(items.name);
    }
    this.task.patchValue({
      status: this.names[0],
    });
  }
  listeningToStatusChange() {
    this.task.controls.status.valueChanges.subscribe((s) => {
      if (s !== this.ifStatusChanged.status) {
        this.ifStatusChanged.isChanged = true;
      } else {
        this.ifStatusChanged.isChanged = false;
      }
    });
  }
  addingSubTasks(ts: Task) {
    for (let i = 2; i < ts.subtasks.length; i++) {
      this.subTask.push(
        new FormGroup({
          title: new FormControl<string>(ts.subtasks[i].title),
          isCompleted: new FormControl<boolean>(ts.subtasks[i].isCompleted),
        })
      );
    }
  }
  ngOnInit(): void {
    this.taskGetting = this.boartState.sendingEditTask.subscribe((t: Task) => {
      this.editMode = true;
      this.ifStatusChanged.status = t.status;
      this.ifStatusChanged._id = t._id;
      this.task.patchValue({
        _id: t._id,
        title: t.title,
        description: t.description,
        subtasks: t.subtasks,
        status: t.status,
      });
      this.addingSubTasks(t);
      this.listeningToStatusChange();
    });
    this.collumnNameUpdates();
  }
  ngOnDestroy(): void {
    this.taskGetting.unsubscribe();
  }
}
