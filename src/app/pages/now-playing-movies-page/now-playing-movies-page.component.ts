import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';
import { Store } from '@ngrx/store';
import { MovieState } from '@store/state';
import { loadNowPlayingMovies } from '@store/actions';
import { selectNowPlayingMovies } from '@store/selectors';

@Component({
	selector: 'app-now-playing-movies-page',
	standalone: true,
	templateUrl: './now-playing-movies-page.component.html',
	styleUrl: './now-playing-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
// ! TODO fix readability
export class NowPlayingMoviesPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	public titlePage: string = 'Now Playing Movies';
	public movies: Movie[] = [];

	constructor(private store: Store<{ movie: MovieState }>) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(loadNowPlayingMovies());
		this.store
			.select(selectNowPlayingMovies)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((movies) => {
				if (movies) {
					this.movies = movies;
				}
			});
	}
}
