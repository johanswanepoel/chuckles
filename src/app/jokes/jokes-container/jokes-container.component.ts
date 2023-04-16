import { Component, OnDestroy, OnInit, } from '@angular/core';
import { IJoke, IJokeState } from '../jokes.models';
import { Observable, Subject, Subscription, interval, map, takeUntil, takeWhile, tap } from 'rxjs';
import {Store, select} from '@ngrx/store'
import { selectFavouriteJokes, selectJokes, selectTimer } from '../store/jokes.selectors';

import jokesActions from '../store/jokes.actions';

@Component({
  selector: 'app-jokes-container',
  templateUrl: './jokes-container.component.html',
  styleUrls: ['./jokes-container.component.scss']
})
export class JokesContainerComponent implements OnInit, OnDestroy {
  
  public jokes$: Observable<IJoke[]>;
  public favouriteJokes$: Observable<IJoke[]>;
  public timer$: Observable<{ isActive: boolean; interval: number; }>;
  public timer: { isActive: boolean; interval: number; }
  private intervalSubscription: Subscription;
  private timerSubscription: Subscription;

  constructor(private store: Store<IJokeState>) {}

  ngOnInit(): void {
    this.store.dispatch(jokesActions.getJokes({count: 10}))
    this.jokes$ = this.store.pipe(select((selectJokes)));
    this.timerSubscription = this.store.pipe(select(selectTimer)).subscribe((timer) => {
      this.timer = timer
    })
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
    this.timerSubscription.unsubscribe();
    this.store.dispatch(jokesActions.setTimer({isActive: false}))
  }

  addToFavourites(jokeToAdd: IJoke): void {
    this.store.dispatch(jokesActions.addFavouriteJoke({jokeToAdd}))
  }

  removeFromFavourites(jokeId: string): void {
    this.store.dispatch(jokesActions.removeFavouriteJoke({jokeId}))
  }

  toggleTimer(isActive: boolean) {
   this.store.dispatch(jokesActions.setTimer({isActive: !isActive}))
   this.startGettingJobsAtIntervals()
  }

  startGettingJobsAtIntervals() {
    const jobsInterval = interval(this.timer.interval).pipe(takeWhile(() => this.timer.isActive))

    this.intervalSubscription = jobsInterval.subscribe(() => {
     this.store.dispatch(jokesActions.getOneJoke())
    })
  }
  
}


