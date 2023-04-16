import { IJokeState, JOKES_REDUCER_KEY } from "../jokes.models";
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectJokesFeature = createFeatureSelector<IJokeState>(JOKES_REDUCER_KEY);

export const selectJokes = createSelector(selectJokesFeature, (state: IJokeState) => state.jokes);
export const selectFavouriteJokes = createSelector(selectJokesFeature, (state: IJokeState) => state.favouriteJokes);
export const selectTimer = createSelector(selectJokesFeature, (state: IJokeState) => state.timer)


