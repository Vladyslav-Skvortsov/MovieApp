import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { MovieService } from '@services/movie-service/movie.service';
import { Movie } from '@interfaces/movie';
import { switchMap, takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@directives/clear-observable/clear-observable.directive';

@Component({
	selector: 'app-watch-later-page',
	standalone: true,
	templateUrl: './watch-later-page.component.html',
	styleUrl: './watch-later-page.component.scss',
	imports: [MoviesPageComponent],
})
// ! TODO fix readability
export class WatchLaterPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	constructor(private movieService: MovieService) {
		super();
	}

	public titlePage: string = 'Watch Later';
	public titleEmptyPage: string = 'Watch Later Is Empty';
	public pageType: string = 'watchLater';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movieService
			.getWatchMoviesList()
			.pipe(
				switchMap(() => this.movieService.getWatchLaterMovies()),
				takeUntil(this.unsubscribe$)
			)
			.subscribe((movies) => {
				this.movies = movies;
			});
	}

	public get isMovies(): boolean {
		return this.movies.length > 0;
	}
}
