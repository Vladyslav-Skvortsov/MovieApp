import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { MovieService } from '@services/movie-service/movie.service';
import { Movie } from '@interfaces/movie';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-watch-later-page',
	standalone: true,
	templateUrl: './watch-later-page.component.html',
	styleUrl: './watch-later-page.component.scss',
	imports: [MovieListComponent, MoviesPageComponent],
})
export class WatchLaterPageComponent implements OnInit, OnDestroy {
	constructor(private movieService: MovieService) {}

	public titlePage: string = 'Watch Later';
	public titleEmptyPage: string = 'Watch Later Is Empty';
	public pageType: string = 'watchLater';

	public movies: Movie[] = [];

	private unsubscribe$ = new Subject<void>();

	ngOnInit(): void {
		this.movieService
			.getWatchMoviesList()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((response) => {
				this.movies = response;
			});
	}
	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	public get isMovies(): boolean {
		return this.movies.length > 0;
	}
}
