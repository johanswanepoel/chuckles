import { IJoke, JOKES_KEY } from '../jokes.models'
import { Observable, forkJoin, of } from 'rxjs'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { JokeDataService } from './joke-data.service'
import { environment } from './../../../environments/environment.prod'

@Injectable({
    providedIn: 'root',
})
export class JokesService {
    private readonly urlRandomChuckJoke: string = `${environment.chuckNorrisJokesEndPointUrl}/jokes/random`

    constructor(
        private http: HttpClient,
        private jokeDataService: JokeDataService
    ) {}

    public getOneJoke(): Observable<IJoke> {
        return this.http.get<IJoke>(this.urlRandomChuckJoke)
    }

    public getManyJokes(count: number): Observable<IJoke[]> {
        const jokes: IJoke[] = new Array(count).fill({})
        const savedJokes = this.jokeDataService.retrieveJokeData(JOKES_KEY)

        if (savedJokes.length) {
            return of(savedJokes)
        }

        return forkJoin(jokes.map(this.getOneJoke.bind(this)))
    }
}
