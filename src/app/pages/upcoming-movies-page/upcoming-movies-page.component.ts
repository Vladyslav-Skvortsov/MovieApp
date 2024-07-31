import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';
import { MovieState } from '@store/state';
import { Store } from '@ngrx/store';
import { loadUpcomingMovies } from '@store/actions';
import { selectupcomingMovies } from '@store/selectors';

@Component({
	selector: 'app-upcoming-movies-page',
	standalone: true,
	templateUrl: './upcoming-movies-page.component.html',
	styleUrl: './upcoming-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
// ! TODO fix readability
export class UpcomingMoviesPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	public titlePage: string = 'Upcoming Movies';
	public movies: Movie[] = [];

	constructor(private store: Store<{ movie: MovieState }>) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(loadUpcomingMovies());
		this.store
			.select(selectupcomingMovies)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((movies) => {
				if (movies) {
					this.movies = movies;
				}
			});
	}
}
