import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { RouterModule } from '@angular/router';
import { MovieService } from '@services/movie.service';
import { Movie } from '@interfaces/movie';
import {
	buttonFavoritesConfig,
	buttonWatchLaterConfig,
	buttonRemoveConfig,
	buttonShowMoreConfig,
} from '@constant/card-button-config';
import { ButtonConfig } from '@interfaces/button';

@Component({
	selector: 'app-movie-card',
	standalone: true,
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
	imports: [
		CardModule,
		ButtonModule,
		TransformRatingPipe,
		TransformDateFormatPipe,
		RouterModule,
	],
})
export class MovieCardComponent {
	constructor(private movieService: MovieService) {}

	public buttonFavoritesConfig: ButtonConfig = buttonFavoritesConfig;
	public buttonWatchLaterConfig: ButtonConfig = buttonWatchLaterConfig;
	public buttonRemoveConfig: ButtonConfig = buttonRemoveConfig;
	public buttonShowMoreConfig: ButtonConfig = buttonShowMoreConfig;

	@Input() movie!: Movie;
	@Input() pageType: string | undefined;

	addToFavorites(): void {
		this.movieService.addToFavorites(this.movie);
	}
	addToWatchLater(): void {
		this.movieService.addToWatchLater(this.movie);
	}

	removeFromFavorites(): void {
		this.movieService.removeFromFavorites(this.movie.id);
	}
	removeFromWatchLater(): void {
		this.movieService.removeFromWatchLater(this.movie.id);
	}
}
