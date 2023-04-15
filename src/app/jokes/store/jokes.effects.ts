import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import JokeActions from './jokes.actions';
import { JokesService } from '../jokes.service';

@Injectable()
export class JokesEffects {

  getJokes$ = createEffect(() => this.actions$.pipe(
    ofType(JokeActions.getJokes),
    mergeMap(({ count }) => this.jokesService.getManyJokes(count)
      .pipe(
        map(jokes => JokeActions.getJokesSuccess({ jokes })),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private jokesService: JokesService
  ) {}
}