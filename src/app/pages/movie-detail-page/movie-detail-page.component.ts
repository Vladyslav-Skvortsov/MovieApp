import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie-service/movie.service';
import { BASE_IMG_URL } from '@constants/constant-api';
import { ClearObservableDirective } from '@directives/clear-observable/clear-observable.directive';

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
	constructor(
		private route: ActivatedRoute,
		private movieService: MovieService
	) {
		super();
	}

	public movie: Movie | undefined;
	public textEmpty: string = 'Loading...';
	public imagePath: string | undefined;

	ngOnInit(): void {
		const movieId = Number(this.route.snapshot.paramMap.get('id'));
		this.loadMovieDetails(movieId);
	}

	loadMovieDetails(id: number | null) {
		if (id) {
			this.movieService
				.getMovieById(id)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe((movie) => {
					this.movie = movie;
					this.imagePath = this.movie
						? `${BASE_IMG_URL}${this.movie.poster_path}`
						: '';
				});
		}
	}
}
