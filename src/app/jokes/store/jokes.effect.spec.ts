import { Action, Store } from '@ngrx/store';

import { Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { IJokeState } from '../jokes.models';
import { JokeDataService } from '../services/joke-data.service';
import { JokesEffects } from './jokes.effects';
import { JokesService } from '../services/jokes.service';
import { hot } from 'jest-marbles';
import jokesActions from './jokes.actions';

describe('JokesEffects', () => {

  let jokesServiceMock: JokesService
  let jokeDataServiceMock: JokeDataService
  let storeMock: Store<IJokeState>

  beforeEach(() => {
   jokesServiceMock = new JokesService({} as HttpClient, {} as JokeDataService);
   jokeDataServiceMock = new JokeDataService()
   storeMock = {
    select: jest.fn(),
   } as unknown as Store<IJokeState>
  });

  function effectsFor(action: Action): JokesEffects {
    const source = hot('a', {a: action});
    return new JokesEffects(
      new Actions(source),
      jokesServiceMock,
      jokeDataServiceMock,
      storeMock
    )
  }

describe('jokesActions.getJokes', () => {
  it('should get many jokes', () => {

    const jokeCount = 10;
    const givenAction = jokesActions.getJokes({count: jokeCount});
    const givenEffect = effectsFor(givenAction).getManyJokes$
    const givenSpy = jest.spyOn(jokesServiceMock, 'getManyJokes')

    expect(givenEffect).toSatisfyOnFlush(() => {
      expect(givenSpy).toHaveBeenCalledWith(jokeCount)
    })
  });
})

describe('jokesActions.getOneJoke', () => {
  it('should get one joke', () => {

    const givenAction = jokesActions.getOneJoke();
    const givenEffect = effectsFor(givenAction).getOneJoke$
    const givenSpy = jest.spyOn(jokesServiceMock, 'getOneJoke')

    expect(givenEffect).toSatisfyOnFlush(() => {
      expect(givenSpy).toHaveBeenCalled()
    })
  });
})


});