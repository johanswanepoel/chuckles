import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FAVOURITE_JOKES_KEY, IJokeState, JOKES_KEY } from '../jokes.models';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { selectFavouriteJokes, selectJokes } from './jokes.selectors';

import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import JokeActions from './jokes.actions';
import { JokeDataService } from '../services/joke-data.service';
import { JokesService } from '../services/jokes.service';
import { Store } from '@ngrx/store';

@Injectable()
export class JokesEffects {

  getManyJokes$ = createEffect(() => this.actions$.pipe(
    ofType(JokeActions.getJokes),
    mergeMap(({ count }) => this.jokesService.getManyJokes(count)
      .pipe(
        map(jokes => JokeActions.getJokesSuccess({ jokes })),
        catchError(() => EMPTY)
      ))
  )
  );

  getOneJoke$ = createEffect(() => this.actions$.pipe(
    ofType(JokeActions.getOneJoke),
    mergeMap(() => this.jokesService.getOneJoke()
      .pipe(
        map(joke => JokeActions.getOneJokeSuccess({ joke })),
        catchError(() => EMPTY)
      ))
  )
  );

  persistOneJoke$ = createEffect(() => this.actions$.pipe(
    ofType(JokeActions.getOneJokeSuccess),
    withLatestFrom(this.store.select(selectJokes)),
    map(([, jokesInState]) => this.jokeDataService.persistJokeData(JOKES_KEY, jokesInState.slice(0, 10)))
  ), {dispatch: false})

  persistManyJokes$ = createEffect(() => this.actions$.pipe(
    ofType(JokeActions.getJokesSuccess),
    map(({jokes}) => this.jokeDataService.persistJokeData(JOKES_KEY,jokes))
  ), {dispatch: false})

  addToFavourites$ = createEffect(() => this.actions$.pipe(
    ofType(JokeActions.addFavouriteJoke),
    map(({jokeToAdd}) => this.jokeDataService.persistToFavourites(jokeToAdd))
  ), {dispatch: false})

  removeFromFavourites$ = createEffect(() => this.actions$.pipe(
    ofType(JokeActions.removeFavouriteJoke),
    withLatestFrom(this.store.select(selectFavouriteJokes)),
    map(([{jokeId}, favJokes]) => this.jokeDataService.persistJokeData(FAVOURITE_JOKES_KEY, favJokes.filter(joke => joke.id !== jokeId)))
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private jokesService: JokesService,
    private jokeDataService: JokeDataService,
    private store: Store<IJokeState>
  ) {}
}