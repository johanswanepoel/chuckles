import { CommonModule } from '@angular/common';
import {EffectsModule} from '@ngrx/effects'
import { FavouritesContainerComponent } from './favourites-container/favourites-container.component';
import { JOKES_REDUCER_KEY } from './jokes.models';
import { JokeListComponent } from './joke-list/joke-list.component';
import { JokesContainerComponent } from './jokes-container/jokes-container.component';
import { JokesEffects } from './store/jokes.effects';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/jokes.reducer';

@NgModule({
  declarations: [
    JokesContainerComponent,
    JokeListComponent,
    FavouritesContainerComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(JOKES_REDUCER_KEY, reducer),
    EffectsModule.forFeature([JokesEffects]),
    StoreDevtoolsModule.instrument()
  ],

})
export class JokesModule { }
