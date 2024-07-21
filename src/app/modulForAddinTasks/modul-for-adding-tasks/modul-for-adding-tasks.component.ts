import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import ObjectID from 'bson-objectid';

@Component({
  selector: 'app-modul-for-adding-tasks',
  templateUrl: './modul-for-adding-tasks.component.html',
  styleUrl: './modul-for-adding-tasks.component.scss',
})
export class ModulForAddingTasksComponent {
  constructor() {}
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
}
