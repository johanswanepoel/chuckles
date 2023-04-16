import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JokesContainerComponent } from './jokes-container.component'
import { provideMockStore } from '@ngrx/store/testing'

describe('JokesContainerComponent', () => {
    let component: JokesContainerComponent
    let fixture: ComponentFixture<JokesContainerComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JokesContainerComponent],
            providers: [provideMockStore({})]
        }).compileComponents()

        fixture = TestBed.createComponent(JokesContainerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
