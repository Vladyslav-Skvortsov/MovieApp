import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { RouterModule } from '@angular/router';
import { MovieService } from '@services/movie.service';
import { Movie } from '@interfaces/movie';
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

	@Input() movie!: Movie;
	@Input() pageType: string | undefined;

	public buttonFavorites: ButtonConfig = {
		icon: 'pi pi-heart',
		label: 'Favorite',
		severity: undefined,
		class: 'movie-card__button-card favorite',
	};
	public buttonWatchLater: ButtonConfig = {
		icon: 'pi pi-bookmark',
		label: 'Watch',
		severity: 'contrast',
		class: 'movie-card__button-card watch',
	};
	public buttonRemove: ButtonConfig = {
		icon: 'pi pi-trash',
		label: 'Delete',
		severity: 'danger',
		class: 'movie-card__button-card remove',
	};
	public buttonShowMore: ButtonConfig = {
		icon: 'pi pi-eye',
		label: 'Show more...',
		severity: 'contrast',
		class: 'movie-card__button-card show-more',
	};

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
