import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie-service/movie.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-upcoming-movies-page',
	standalone: true,
	templateUrl: './upcoming-movies-page.component.html',
	styleUrl: './upcoming-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class UpcomingMoviesPageComponent implements OnInit, OnDestroy {
	constructor(private movieService: MovieService) {}

	private unsubscribe$ = new Subject<void>();

	public titlePage: string = 'Upcoming Movies';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movieService
			.getUpcomingMoviesList()
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
