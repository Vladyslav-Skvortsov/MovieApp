import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { selectPopularMovies } from '@store/selectors';
import { loadPopularMovies } from '@store/actions';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';
import { MovieState } from '@store/state';

@Component({
	selector: 'app-popular-movies-page',
	standalone: true,
	templateUrl: './popular-movies-page.component.html',
	styleUrl: './popular-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
// ! TODO fix readability
export class PopularMoviesPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	public titlePage: string = 'Popular Movies';
	public movies: Movie[] = [];

	constructor(private store: Store<{ movie: MovieState }>) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(loadPopularMovies());
		this.store
			.select(selectPopularMovies)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((movies) => {
				if (movies) {
					this.movies = movies;
				}
			});
	}
}
