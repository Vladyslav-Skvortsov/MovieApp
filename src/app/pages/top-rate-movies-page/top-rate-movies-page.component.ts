import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';
import { MovieState } from '@store/state';
import { Store } from '@ngrx/store';
import { loadTopRateMovies } from '@store/actions';
import { selectTopRateMovies } from '@store/selectors';

@Component({
	selector: 'app-top-rate-movies-page',
	standalone: true,
	templateUrl: './top-rate-movies-page.component.html',
	styleUrl: './top-rate-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
// ! TODO fix readability
export class TopRateMoviesPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	public titlePage: string = 'Top Rate Movies';
	public movies: Movie[] = [];

	constructor(private store: Store<{ movie: MovieState }>) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(loadTopRateMovies());
		this.store
			.select(selectTopRateMovies)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((movies) => {
				if (movies) {
					this.movies = movies;
				}
			});
	}
}
