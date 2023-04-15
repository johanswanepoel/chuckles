import { jokesFeatureKey, reducer } from './store/jokes.reducer';

import { CommonModule } from '@angular/common';
import {EffectsModule} from '@ngrx/effects'
import { JokesContainerComponent } from './jokes-container/jokes-container.component';
import { JokesEffects } from './store/jokes.effects';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    JokesContainerComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(jokesFeatureKey, reducer),
    EffectsModule.forFeature([JokesEffects]),
    StoreDevtoolsModule.instrument()
  ],

})
export class JokesModule { }
