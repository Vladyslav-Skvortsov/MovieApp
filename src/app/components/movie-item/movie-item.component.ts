import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';

@Component({
	selector: 'app-movie-item',
	standalone: true,
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss'],
	imports: [TransformRatingPipe],
})
export class MovieItemComponent {
	@Input() movie: any;
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	addToFavorites() {
		this.addFavorite.emit(this.movie);
	}

	addToWatch() {
		this.addWatch.emit(this.movie);
	}
}
