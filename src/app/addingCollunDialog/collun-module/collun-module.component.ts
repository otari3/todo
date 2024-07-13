import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Column } from '../../shared/boardInterface';
import { BoardStateService } from '../../shared/board-state.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-collun-module',
  templateUrl: './collun-module.component.html',
  styleUrl: './collun-module.component.scss',
})
export class CollunModuleComponent implements OnInit {
  constructor(private boardState: BoardStateService) {}
  allTheOptions = ['Todo', 'Doing', 'Done'];
  optionValue!: string;
  dialogRef = inject(MatDialogRef<CollunModuleComponent>);
  onAdd() {
    const col: Column = {
      name: this.optionValue,
      tasks: [],
    };
    this.boardState.sendingColumn.next(col);
    this.dialogRef.close();
  }
  removeingFromOptions() {
    for (let i of this.boardState.corruntLoadedCollumn) {
      let index = this.allTheOptions.findIndex((items) => {
        return items === i.name;
      });
      this.allTheOptions.splice(index, 1);
    }
  }
  ngOnInit(): void {
    this.removeingFromOptions();
    this.optionValue = this.allTheOptions[0];
  }
}
