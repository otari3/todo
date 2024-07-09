import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundForCollumsComponent } from './backgroundForCollumns/background-for-collums/background-for-collums.component';
import { AlltheCollumsComponent } from './backgroundForCollumns/background-for-collums/alltheCollums/allthe-collums/allthe-collums.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: BackgroundForCollumsComponent,
    children: [{ path: ':id', component: AlltheCollumsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
