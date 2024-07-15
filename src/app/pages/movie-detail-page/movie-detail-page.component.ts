import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie-service/movie.service';
import { BASE_IMG_URL } from '@constants/constant-api';

@Component({
	selector: 'app-movie-detail-page',
	standalone: true,
	imports: [TransformRatingPipe, TransformDateFormatPipe],
	templateUrl: './movie-detail-page.component.html',
	styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private movieService: MovieService
	) {}

	private unsubscribe$ = new Subject<void>();

	public movie: Movie | undefined;
	public textEmpty: string = 'Loading...';
	public imagePath: string | undefined;

	ngOnInit(): void {
		const movieId = this.route.snapshot.paramMap.get('id');
		this.loadMovieDetails(movieId);
	}
	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	loadMovieDetails(id: string | null) {
		if (id) {
			this.movieService
				.getMovieById(Number(id))
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
