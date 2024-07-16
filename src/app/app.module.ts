import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavForBoardsComponent } from './navForBoards/nav-for-boards/nav-for-boards.component';
import { ModalForBoardComponent } from './addingAndEdtingNewBoard/modal-for-board/modal-for-board.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BackgroundForCollumsComponent } from './backgroundForCollumns/background-for-collums/background-for-collums.component';
import { AlltheCollumsComponent } from './backgroundForCollumns/background-for-collums/alltheCollums/allthe-collums/allthe-collums.component';
import { SinglecollumComponent } from './backgroundForCollumns/background-for-collums/alltheCollums/allthe-collums/singleCollum/singlecollum/singlecollum.component';
import { HttpClientModule } from '@angular/common/http';
import { ApicallsService } from './shared/apicalls.service';
import { BoardStateService } from './shared/board-state.service';
import { CollunModuleComponent } from './addingCollunDialog/collun-module/collun-module.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { FilteringComplitSubtasksPipe } from './shared/filtering-complit-subtasks.pipe';

const initializeApp = (api: ApicallsService) => {
  return () => {
    return api.getBoard();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    NavForBoardsComponent,
    ModalForBoardComponent,
    BackgroundForCollumsComponent,
    AlltheCollumsComponent,
    SinglecollumComponent,
    CollunModuleComponent,
    TasksComponent,
    FilteringComplitSubtasksPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync('noop'),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [ApicallsService, BoardStateService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
