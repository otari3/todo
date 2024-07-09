import { Component, OnInit } from '@angular/core';
import { BoardStateService } from './shared/board-state.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private boardState: BoardStateService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {}
}
