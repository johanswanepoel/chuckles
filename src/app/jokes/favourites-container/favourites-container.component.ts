import { Component, OnInit } from '@angular/core'
import { IJoke, IJokeState } from '../jokes.models'
import { Store, select } from '@ngrx/store'

import { Observable } from 'rxjs'
import jokesActions from '../store/jokes.actions'
import {
    selectFavouriteJokes,
} from '../store/jokes.selectors'

@Component({
    selector: 'app-favourites-container',
    templateUrl: './favourites-container.component.html',
    styleUrls: ['./favourites-container.component.scss'],
})
export class FavouritesContainerComponent implements OnInit {
    public jokes$: Observable<IJoke[]>
    public favouriteJokes$: Observable<IJoke[]>
    public timer$: Observable<{ isActive: boolean; interval: number }>

    constructor(
        private store: Store<IJokeState>,
    ) {}

    ngOnInit(): void {
        this.favouriteJokes$ = this.store.pipe(select(selectFavouriteJokes))
    }

    removeFromFavourites(jokeId: string): void {
        this.store.dispatch(jokesActions.removeFavouriteJoke({ jokeId }))
    }
}
