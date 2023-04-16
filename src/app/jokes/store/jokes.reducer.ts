import { Action, createReducer, on } from '@ngrx/store'
import {
    FAVOURITE_JOKES_KEY,
    IJoke,
    IJokeState,
    JOKES_KEY,
} from '../jokes.models'

import JokeActions from './jokes.actions'
import { parseJSON } from 'src/app/utils'

const initialState: IJokeState = {
    jokes: parseJSON<IJoke[]>(localStorage.getItem(JOKES_KEY) ?? '[]'),
    favouriteJokes: parseJSON<IJoke[]>(
        localStorage.getItem(FAVOURITE_JOKES_KEY) ?? '[]'
    ),
    timer: {
        isActive: false,
        interval: 5000,
    },
}

const jokesReducer = createReducer(
    initialState,
    on(JokeActions.getJokesSuccess, (state, { jokes }) => ({
        ...state,
        jokes,
    })),
    on(JokeActions.setTimer, (state, { isActive, interval }) => ({
        ...state,
        timer: {
            ...state.timer,
            isActive,
            interval: interval ? interval : state.timer.interval,
        },
    })),
    on(JokeActions.addFavouriteJoke, (state, { jokeToAdd }) => {
        const newFavouriteJokes = state.favouriteJokes.some(
            (joke) => joke.id === jokeToAdd.id
        )
            ? state.favouriteJokes
            : [...state.favouriteJokes, jokeToAdd]
        return {
            ...state,
            favouriteJokes: newFavouriteJokes.reverse().slice(0, 10),
        }
    }),
    on(JokeActions.removeFavouriteJoke, (state, { jokeId }) => ({
        ...state,
        favouriteJokes: state.favouriteJokes.filter(
            (joke) => joke.id !== jokeId
        ),
    })),
    on(JokeActions.getOneJokeSuccess, (state, { joke }) => ({
        ...state,
        jokes: [joke, ...state.jokes].slice(0, 10),
    }))
)

export function reducer(state: IJokeState | undefined, action: Action) {
    return jokesReducer(state, action)
}
