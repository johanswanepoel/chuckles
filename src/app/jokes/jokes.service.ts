import { Observable, forkJoin, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IJoke } from './jokes.models';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private readonly urlRandomChuckJoke: string = `${environment.chuckNorrisJokesEndPointUrl}/jokes/random`;
  private initialJokes: Observable<IJoke[]>;

  constructor(private http: HttpClient) {}

  public getOneJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(this.urlRandomChuckJoke);
  }

  public getManyJokes(count: number): Observable<IJoke[]> {
    const jokes: IJoke[] = new Array(count).fill({});

    this.initialJokes = forkJoin(jokes.map(this.getOneJoke.bind(this)));

    return this.initialJokes;
  }
}
