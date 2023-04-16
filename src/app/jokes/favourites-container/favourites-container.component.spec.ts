import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FavouritesContainerComponent } from './favourites-container.component'
import { provideMockStore } from '@ngrx/store/testing';

describe('FavouritesContainerComponent', () => {
    let component: FavouritesContainerComponent
    let fixture: ComponentFixture<FavouritesContainerComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FavouritesContainerComponent],
            providers: [provideMockStore({})]
        }).compileComponents()

        fixture = TestBed.createComponent(FavouritesContainerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})


