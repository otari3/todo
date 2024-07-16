import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Task } from './boardInterface';

@Pipe({
  name: 'filteringComplitSubtasks',
})
export class FilteringComplitSubtasksPipe implements PipeTransform {
  transform(value: Task) {
    let comp = value.subtasks.filter((item) => {
      return item.isCompleted;
    });
    return comp.length;
  }
}
