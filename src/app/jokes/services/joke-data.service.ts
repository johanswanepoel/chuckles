import { FAVOURITE_JOKES_KEY, IJoke } from '../jokes.models';
import { parseJSON, stringifyJSON } from 'src/app/utils';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokeDataService {

  persistJokeData(key: string, data: IJoke[]): void {
    localStorage.setItem(key, stringifyJSON<IJoke[]>(data))
  }

  retrieveJokeData(key: string): IJoke[] {
    const jokeData = localStorage.getItem(key);

    return (jokeData != null) ? parseJSON<IJoke[]>(jokeData) : []
  }

  persistToFavourites(jokeToAdd: IJoke) {
    const savedFavourites: IJoke[] = parseJSON<IJoke[]>(localStorage.getItem(FAVOURITE_JOKES_KEY) ?? '[]');

    const newFavouriteJokes = savedFavourites.some(joke => joke.id === jokeToAdd.id)
      ? savedFavourites
      : [ jokeToAdd, ...savedFavourites]

    this.persistJokeData(FAVOURITE_JOKES_KEY, newFavouriteJokes.slice(0, 10))
  }

}
