import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IJokeState } from "../jokes.models";
import { jokesFeatureKey } from "./jokes.reducer";

const selectJokesFeature = createFeatureSelector<IJokeState>(jokesFeatureKey);

export const selectJokes = createSelector(selectJokesFeature, (state: IJokeState) => state.jokes);
export const selectFavouriteJokes = createSelector(selectJokesFeature, (state: IJokeState) => state.favouriteJokes);
export const selectTimer = createSelector(selectJokesFeature, (state: IJokeState) => state.timer)


