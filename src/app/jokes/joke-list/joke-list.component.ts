import { Component, EventEmitter, Input, Output } from '@angular/core'

import { IJoke } from '../jokes.models'

@Component({
    selector: 'app-joke-list',
    templateUrl: './joke-list.component.html',
    styleUrls: ['./joke-list.component.scss'],
})
export class JokeListComponent {
    @Input() jokes: IJoke[]
    @Input() canAdd: boolean
    @Input() canRemove: boolean
    @Output() addedToFavourites: EventEmitter<IJoke> = new EventEmitter<IJoke>()
    @Output() removedFromFavourites: EventEmitter<string> =
        new EventEmitter<string>()

    addToFavourites(joke: IJoke): void {
        this.addedToFavourites.emit(joke)
    }

    removeFromFavourites(jokeId: string): void {
        this.removedFromFavourites.emit(jokeId)
    }
}
