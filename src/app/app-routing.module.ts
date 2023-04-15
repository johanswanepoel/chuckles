import { RouterModule, Routes } from '@angular/router';

import { JokesContainerComponent } from './jokes/jokes-container/jokes-container.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: JokesContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
