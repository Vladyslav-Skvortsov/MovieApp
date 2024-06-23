import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformRatingPipe } from '@pipes/transform-rating.pipe';

@Component({
	selector: 'app-movie-card',
	standalone: true,
	imports: [CardModule, ButtonModule, TransformRatingPipe],
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
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
