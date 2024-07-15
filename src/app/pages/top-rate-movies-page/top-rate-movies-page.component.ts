import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie-service/movie.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-top-rate-movies-page',
	standalone: true,
	templateUrl: './top-rate-movies-page.component.html',
	styleUrl: './top-rate-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class TopRateMoviesPageComponent implements OnInit, OnDestroy {
	constructor(private movieService: MovieService) {}

	private unsubscribe$ = new Subject<void>();

	public titlePage: string = 'Top Rate Movies';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movieService
			.getTopRatedMoviesList()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((response) => {
				this.movies = response.results;
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
