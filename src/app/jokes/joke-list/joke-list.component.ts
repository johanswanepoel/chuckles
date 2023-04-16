import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IJoke } from '../jokes.models';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent  {

  @Input() jokes: IJoke[];
  @Output() addedToFavourites: EventEmitter<IJoke> = new EventEmitter<IJoke>()
  
  addToFavourites(joke: IJoke) {
    this.addedToFavourites.emit(joke)
  }

}
