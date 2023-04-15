import { Component } from '@angular/core';
import { IJoke } from '../jokes.models';
import { JokesService } from '../jokes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jokes-container',
  templateUrl: './jokes-container.component.html',
  styleUrls: ['./jokes-container.component.scss']
})
export class JokesContainerComponent {
  public jokes$: Observable<IJoke[]>;

  constructor(private jokeService: JokesService) {}

  ngOnInit(): void {
    this.jokes$ = this.jokeService.getManyJokes(10);
  }
}
