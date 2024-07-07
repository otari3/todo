import { Component } from '@angular/core';
import { BoardElement, Column } from '../../shared/boardInterface';

@Component({
  selector: 'app-modal-for-board',
  templateUrl: './modal-for-board.component.html',
  styleUrl: './modal-for-board.component.scss',
})
export class ModalForBoardComponent {
  newColumNames: { name?: string }[] = [];
  removedColums: { index: number; name?: string }[] = [];
  onAddNewCollum() {
    if (this.removedColums.length > 0) {
      const lastElement = this.removedColums.pop();
      this.newColumNames[lastElement!.index].name = lastElement?.name;
    } else if (this.newColumNames.length != 3) {
      const newName =
        this.newColumNames.length === 0
          ? 'Todo'
          : this.newColumNames.length === 1
          ? 'Doing'
          : 'Done';
      this.newColumNames.push({ name: newName });
    }
  }
  removeingCollum(index: number) {
    this.removedColums.push({
      index: index,
      name: this.newColumNames[index].name,
    });
    this.newColumNames[index].name = '';
  }
}
