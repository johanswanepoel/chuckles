import { Observable, forkJoin, of, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IJoke } from './jokes.models';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private readonly urlRandomChuckJoke: string = `${environment.chuckNorrisJokesEndPointUrl}/jokes/random`;
  

  constructor(private http: HttpClient) {}

  public getOneJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(this.urlRandomChuckJoke);
  }

  public getManyJokes(count: number): Observable<IJoke[]> {
    const jokes: IJoke[] = new Array(count).fill({});

    const savedJokes = localStorage.getItem('jokes')

    if (savedJokes != null) {
      return this.getJokesFromLocalStorage();
    }

     return forkJoin(jokes.map(this.getOneJoke.bind(this))).pipe(tap(jokes => {
      this.setLocalStorage(jokes)
   
    }));

  }

  private setLocalStorage(jokes: IJoke[]) {
    localStorage.setItem('jokes', JSON.stringify(jokes))
  }

  private getJokesFromLocalStorage(): Observable<IJoke[]> {
    return of(JSON.parse(localStorage.getItem('jokes') ?? '[]') as IJoke[]);
  }
}
