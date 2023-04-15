import { createAction, props } from '@ngrx/store';

import { IJoke } from '../jokes.models';
import { interval } from 'rxjs';

const getJokes = createAction(
  '[Jokes] get jokes',
  props<{ count: number }>()
);

const getJokesSuccess = createAction(
  '[Jokes] get jokes success',
  props<{ jokes: IJoke[] }>()
);


const setTimer = createAction('[Jokes] set timer', props<{isActive: boolean, interval?: number}>())
const addFavouriteJoke = createAction('[Jokes] add to favourite jokes', props<{jokeToAdd: IJoke}>())
const removeFavouriteJoke = createAction('[Jokes] remove from favourite jokes', props<{jokeId: string}>())

export default {getJokes, getJokesSuccess, setTimer, addFavouriteJoke, removeFavouriteJoke}


