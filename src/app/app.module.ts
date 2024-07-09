import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavForBoardsComponent } from './navForBoards/nav-for-boards/nav-for-boards.component';
import { ModalForBoardComponent } from './addingAndEdtingNewBoard/modal-for-board/modal-for-board.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BackgroundForCollumsComponent } from './backgroundForCollumns/background-for-collums/background-for-collums.component';
import { AlltheCollumsComponent } from './backgroundForCollumns/background-for-collums/alltheCollums/allthe-collums/allthe-collums.component';
import { SinglecollumComponent } from './backgroundForCollumns/background-for-collums/alltheCollums/allthe-collums/singleCollum/singlecollum/singlecollum.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavForBoardsComponent,
    ModalForBoardComponent,
    BackgroundForCollumsComponent,
    AlltheCollumsComponent,
    SinglecollumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
