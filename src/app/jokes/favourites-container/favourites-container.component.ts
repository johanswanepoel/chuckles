import { IJoke, IJokeState } from '../jokes.models';
import { Observable, combineLatest, forkJoin, map, of, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectFavouriteJokes, selectJokes, selectTimer } from '../store/jokes.selectors';

import { Component } from '@angular/core';
import { JokeDataService } from '../services/joke-data.service';
import jokesActions from '../store/jokes.actions';

@Component({
  selector: 'app-favourites-container',
  templateUrl: './favourites-container.component.html',
  styleUrls: ['./favourites-container.component.scss']
})
export class FavouritesContainerComponent {
  public jokes$: Observable<IJoke[]>;
  public favouriteJokes$: Observable<IJoke[]>;
  public timer$: Observable<{ isActive: boolean; interval: number; }>;

  constructor(private store: Store<IJokeState>, private jokeDataService: JokeDataService) {}

  ngOnInit(): void {
    this.favouriteJokes$ = 
      this.store.pipe(select(selectFavouriteJokes))
  }

  removeFromFavourites(jokeId: string): void {
    this.store.dispatch(jokesActions.removeFavouriteJoke({jokeId}))
  }

}
