import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { Movie } from '@interfaces/movie';
import { BASE_IMG_URL } from '@constants/constant-api';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';
import { Store } from '@ngrx/store';
import { loadMovieDetail } from '@store/actions';
import { selectMovieDetail } from '@store/selectors';

@Component({
	selector: 'app-movie-detail-page',
	standalone: true,
	imports: [TransformRatingPipe, TransformDateFormatPipe],
	templateUrl: './movie-detail-page.component.html',
	styleUrl: './movie-detail-page.component.scss',
})
// ! TODO fix readability
export class MovieDetailPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	public movie: Movie | null = null;
	public textEmpty: string = 'Loading...';
	public imagePath: string | undefined;

	constructor(private route: ActivatedRoute, private store: Store) {
		super();
	}

	ngOnInit(): void {
		const movieId = Number(this.route.snapshot.paramMap.get('id'));
		if (movieId) {
			this.store.dispatch(loadMovieDetail({ id: movieId }));
			this.store
				.select(selectMovieDetail)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe((movie) => {
					this.movie = movie;
					this.imagePath = movie
						? `${BASE_IMG_URL}${movie.poster_path}`
						: '';
				});
		}
	}
}
