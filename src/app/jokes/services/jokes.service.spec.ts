import { JokesService } from './jokes.service'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'

describe('JokesService', () => {
    let service: JokesService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        })
        service = TestBed.inject(JokesService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
