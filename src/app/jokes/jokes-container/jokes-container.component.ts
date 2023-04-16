import { Component, OnDestroy, OnInit } from '@angular/core'
import { IJoke, IJokeState } from '../jokes.models'
import {
    Observable,
    Subject,
    Subscription,
    interval,
    map,
    repeat,
    switchMap,
    takeUntil,
    takeWhile,
} from 'rxjs'
import { Store, select } from '@ngrx/store'
import { selectJokes, selectTimer } from '../store/jokes.selectors'

import jokesActions from '../store/jokes.actions'

@Component({
    selector: 'app-jokes-container',
    templateUrl: './jokes-container.component.html',
    styleUrls: ['./jokes-container.component.scss'],
})
export class JokesContainerComponent implements OnInit, OnDestroy {
    public jokes$: Observable<IJoke[]>
    public favouriteJokes$: Observable<IJoke[]>
    public timer$: Observable<{ isActive: boolean; interval: number }>
    private intervalSubscription: Subscription
    private onDestroy$: Subject<void> = new Subject<void>()

    constructor(private store: Store<IJokeState>) {}

    ngOnInit(): void {
        this.store.dispatch(jokesActions.getJokes({ count: 10 }))
        this.jokes$ = this.store.pipe(select(selectJokes))
        this.timer$ = this.store.pipe(select(selectTimer))
        this.startGettingJobsAtIntervals(5000)
    }

    ngOnDestroy(): void {
        this.intervalSubscription?.unsubscribe()
        this.store.dispatch(jokesActions.setTimer({ isActive: false }))
        this.onDestroy$.next()
    }

    addToFavourites(jokeToAdd: IJoke): void {
        this.store.dispatch(jokesActions.addFavouriteJoke({ jokeToAdd }))
    }

    toggleTimer({ isActive }: { isActive: boolean }) {
        this.store.dispatch(jokesActions.setTimer({ isActive: !isActive }))
    }

    startGettingJobsAtIntervals(timeInterval: number) {
        this.intervalSubscription = interval(timeInterval)
            .pipe(
                switchMap(() => this.timer$),
                takeWhile((data) => data.isActive),
                takeUntil(this.onDestroy$),
                repeat(),
                map(() => this.store.dispatch(jokesActions.getOneJoke()))
            )
            .subscribe()
    }
}
