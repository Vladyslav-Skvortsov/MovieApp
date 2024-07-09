import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { RouterModule } from '@angular/router';
import { MovieService } from '@services/movie-service/movie.service';
import { Movie } from '@interfaces/movie';
import {
	buttonFavoritesConfig,
	buttonWatchLaterConfig,
	buttonRemoveConfig,
	buttonShowMoreConfig,
} from '@constants/card-button-config';
import { ButtonConfig } from '@interfaces/button';
import { ImageService } from '@services/image-service/image.service';

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
	constructor(
		private movieService: MovieService,
		private imageService: ImageService
	) {}

	@Input() movie!: Movie;
	@Input() pageType: string | undefined;

	public buttonFavoritesConfig: ButtonConfig = buttonFavoritesConfig;
	public buttonWatchLaterConfig: ButtonConfig = buttonWatchLaterConfig;
	public buttonRemoveConfig: ButtonConfig = buttonRemoveConfig;
	public buttonShowMoreConfig: ButtonConfig = buttonShowMoreConfig;

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

	getPosterPath(path: string): string {
		return this.imageService.getFullImagePath(path);
	}
}
