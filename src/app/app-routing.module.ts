import { RouterModule, Routes } from '@angular/router';

import { FavouritesContainerComponent } from './jokes/favourites-container/favourites-container.component';
import { JokesContainerComponent } from './jokes/jokes-container/jokes-container.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'jokes',
    component: JokesContainerComponent,

  },
  {
    path: 'favourites',
    component: FavouritesContainerComponent,
  },
  {
    path: '',
    redirectTo: '/jokes',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/jokes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
