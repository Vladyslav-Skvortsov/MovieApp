import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie-service/movie.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-popular-movies-page',
	standalone: true,
	templateUrl: './popular-movies-page.component.html',
	styleUrl: './popular-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class PopularMoviesPageComponent implements OnInit, OnDestroy {
	constructor(private movieService: MovieService) {}

	private unsubscribe$ = new Subject<void>();

	public titlePage: string = 'Popular Movies';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movieService
			.getPopularMoviesList()
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
