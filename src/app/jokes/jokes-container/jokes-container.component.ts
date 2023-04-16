import { Component, OnInit, } from '@angular/core';
import { IJoke, IJokeState } from '../jokes.models';
import {Store, select} from '@ngrx/store'
import { selectFavouriteJokes, selectJokes, selectTimer } from '../store/jokes.selectors';

import { Observable } from 'rxjs';
import jokesActions from '../store/jokes.actions';

@Component({
  selector: 'app-jokes-container',
  templateUrl: './jokes-container.component.html',
  styleUrls: ['./jokes-container.component.scss']
})
export class JokesContainerComponent implements OnInit {
  
  public jokes$: Observable<IJoke[]>;
  public favouriteJokes$: Observable<IJoke[]>;
  public timer$: Observable<{ isActive: boolean; interval: number; }>;

  constructor(private store: Store<IJokeState>) {}

  ngOnInit(): void {
    this.store.dispatch(jokesActions.getJokes({count: 10}))
    this.jokes$ = this.store.pipe(select((selectJokes)))
    this.timer$ = this.store.pipe(select(selectTimer))
  }

  addToFavourites(jokeToAdd: IJoke): void {
    this.store.dispatch(jokesActions.addFavouriteJoke({jokeToAdd}))
  }

  removeFromFavourites(jokeId: string): void {
    this.store.dispatch(jokesActions.removeFavouriteJoke({jokeId}))
  }

  toggleTimer(isActive: boolean) {
   this.store.dispatch(jokesActions.setTimer({isActive: !isActive}))
  }
  
}


