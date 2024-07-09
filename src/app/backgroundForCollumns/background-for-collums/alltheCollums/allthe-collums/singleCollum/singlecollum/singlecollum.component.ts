import { Component, Input } from '@angular/core';
import { Column } from '../../../../../../shared/boardInterface';

@Component({
  selector: 'app-singlecollum',
  templateUrl: './singlecollum.component.html',
  styleUrl: './singlecollum.component.scss',
})
export class SinglecollumComponent {
  @Input() column!: Column;
}
