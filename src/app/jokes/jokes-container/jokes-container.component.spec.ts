import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesContainerComponent } from './jokes-container.component';

describe('JokesContainerComponent', () => {
  let component: JokesContainerComponent;
  let fixture: ComponentFixture<JokesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
