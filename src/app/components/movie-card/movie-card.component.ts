import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { MovieService } from '@services/movie-service/movie.service';
import { Movie } from '@interfaces/movie';
import { ButtonConfig } from '@interfaces/button';
import {
	buttonFavoritesConfig,
	buttonWatchLaterConfig,
	buttonRemoveConfig,
	buttonShowMoreConfig,
} from '@constants/card-button-config';
import { BASE_IMG_URL } from '@constants/constant-api';

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
export class MovieCardComponent implements OnInit {
	constructor(private movieService: MovieService) {}

	@Input() movie!: Movie;
	@Input() pageType: string | undefined;

	public buttonFavoritesConfig: ButtonConfig = buttonFavoritesConfig;
	public buttonWatchLaterConfig: ButtonConfig = buttonWatchLaterConfig;
	public buttonRemoveConfig: ButtonConfig = buttonRemoveConfig;
	public buttonShowMoreConfig: ButtonConfig = buttonShowMoreConfig;

	public imagePath: string | undefined;

	ngOnInit(): void {
		if (this.movie && this.movie) {
			this.imagePath = `${BASE_IMG_URL}${this.movie.poster_path}`;
		}
	}

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
