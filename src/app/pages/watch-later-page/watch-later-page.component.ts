import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@general/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@directives/clear-observable/clear-observable';
import { Store } from '@ngrx/store';
import * as MovieActions from '@store/actions';
import { selectWatchLaterMovies } from '@store/selectors';

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
	public titlePage: string = 'Watch Later Movies';
	public titleEmptyPage: string = 'Watch Later Is Empty';
	public movies: Movie[] = [];

	constructor(private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(MovieActions.loadWatchLaterMovies());
		this.store
			.select(selectWatchLaterMovies)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(movies) => (this.movies = movies),
				(error) => console.error('Error loading watch later movies:', error)
			);
	}

	public get isMovies(): boolean {
		return this.movies.length > 0;
	}
}
