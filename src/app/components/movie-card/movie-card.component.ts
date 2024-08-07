import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { Movie } from '@interfaces/movie';
import * as buttonsConfig from '@constants/card-button-config';
import { BASE_IMG_URL } from '@constants/constant-api';
import { ClearObservableDirective } from '@directives/clear-observable/clear-observable';
import * as MovieActions from '@store/actions';
import { isFavorite, isWatchLater } from '@store/selectors';

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
		CommonModule,
	],
})
// ! TODO fix readability
export class MovieCardComponent
	extends ClearObservableDirective
	implements OnInit
{
	@Input() movie!: Movie;

	public imagePath: string | undefined;
	public pageType: string | undefined;

	public buttonConfigs = {
		icon: buttonsConfig.buttonIconConfig,
		favorites: buttonsConfig.buttonFavoritesConfig,
		watchLater: buttonsConfig.buttonWatchLaterConfig,
		remove: buttonsConfig.buttonRemoveConfig,
		showMore: buttonsConfig.buttonShowMoreConfig,
	};

	public isFavorite$!: Observable<boolean>;
	public isWatchLater$!: Observable<boolean>;

	constructor(private store: Store, private router: Router) {
		super();
	}

	ngOnInit(): void {
		this.pageType = this.extractPageType(this.router.url);

		this.imagePath = this.movie
			? `${BASE_IMG_URL}${this.movie.poster_path}`
			: '';

		this.isFavorite$ = this.store.pipe(select(isFavorite(this.movie.id)));
		this.isWatchLater$ = this.store.pipe(select(isWatchLater(this.movie.id)));
	}

	private extractPageType(url: string): string {
		return url.slice(1);
	}

	private toggleList(
		actionOn: Observable<boolean>,
		addAction: Action,
		removeAction: Action
	): void {
		actionOn.pipe(take(1)).subscribe((isInList) => {
			if (isInList) {
				this.store.dispatch(removeAction);
			} else {
				this.store.dispatch(addAction);
			}
		});
	}

	toggleFavorite(): void {
		this.toggleList(
			this.isFavorite$,
			MovieActions.addToFavoriteMovies({ movieId: this.movie.id }),
			MovieActions.removeFromFavoriteMovies({ movieId: this.movie.id })
		);
	}
	toggleWatchLater(): void {
		this.toggleList(
			this.isWatchLater$,
			MovieActions.addToWatchLaterMovies({ movieId: this.movie.id }),
			MovieActions.removeFromWatchLaterMovies({ movieId: this.movie.id })
		);
	}

	removeFromFavorites(movieId: number): void {
		this.store.dispatch(MovieActions.removeFromFavoriteMovies({ movieId }));
	}
	removeFromWatchLater(movieId: number): void {
		this.store.dispatch(MovieActions.removeFromWatchLaterMovies({ movieId }));
	}
}
