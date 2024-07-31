import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { Movie } from '@interfaces/movie';
import { ButtonConfig } from '@interfaces/button';
import {
	buttonFavoritesConfig,
	buttonWatchLaterConfig,
	buttonRemoveConfig,
	buttonShowMoreConfig,
} from '@constants/card-button-config';
import { BASE_IMG_URL } from '@constants/constant-api';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';
import { Store } from '@ngrx/store';
import * as MovieActions from '@store/actions';

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
// ! TODO fix readability
export class MovieCardComponent
	extends ClearObservableDirective
	implements OnInit
{
	@Input() movie!: Movie;
	@Input() pageType: string | undefined;

	public buttonFavoritesConfig: ButtonConfig = buttonFavoritesConfig;
	public buttonWatchLaterConfig: ButtonConfig = buttonWatchLaterConfig;
	public buttonRemoveConfig: ButtonConfig = buttonRemoveConfig;
	public buttonShowMoreConfig: ButtonConfig = buttonShowMoreConfig;
	public imagePath: string | undefined;

	constructor(private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.imagePath = this.movie
			? `${BASE_IMG_URL}${this.movie.poster_path}`
			: '';
	}

	addToFavorites(): void {
		if (!this.movie || !this.movie.id) {
			console.error('Invalid movie object:', this.movie);
			return;
		}
		this.store.dispatch(
			MovieActions.addToFavoriteMovies({ movieId: this.movie.id })
		);
	}
	addToWatchLater(): void {
		if (!this.movie || !this.movie.id) {
			console.error('Invalid movie object:', this.movie);
			return;
		}
		this.store.dispatch(
			MovieActions.addToWatchLaterMovies({ movieId: this.movie.id })
		);
	}

	removeFromFavorites(movieId: number): void {
		console.log('Removing from favorites movie ID:', movieId);
		if (!this.movie || !this.movie.id) {
			console.error('Invalid movie object:', this.movie);
			return;
		}
		this.store.dispatch(MovieActions.removeFromFavoriteMovies({ movieId }));
	}
	removeFromWatchLater(movieId: number): void {
		console.log('Removing from watch later movie ID:', movieId);
		if (!this.movie || !this.movie.id) {
			console.error('Invalid movie object:', this.movie);
			return;
		}
		this.store.dispatch(MovieActions.removeFromWatchLaterMovies({ movieId }));
	}
}
