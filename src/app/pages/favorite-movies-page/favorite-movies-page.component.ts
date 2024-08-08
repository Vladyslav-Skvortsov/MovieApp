import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@general/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@directives/clear-observable/clear-observable';
import { Store } from '@ngrx/store';
import * as MovieActions from '@store/actions';
import { selectFavoriteMovies } from '@store/selectors';

@Component({
	selector: 'app-favorite-movies-page',
	standalone: true,
	templateUrl: './favorite-movies-page.component.html',
	styleUrl: './favorite-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
// ! TODO fix readability
export class FavoriteMoviesPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	public titlePage: string = 'Favorite Movies';
	public titleEmptyPage: string = 'Favorite Movies Is Empty';
	public movies: Movie[] = [];

	constructor(private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(MovieActions.loadFavoriteMovies());
		this.store
			.select(selectFavoriteMovies)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(movies) => (this.movies = movies),
				(error) => console.error('Error loading favorite movies:', error)
			);
	}

	public get isMovies(): boolean {
		return this.movies.length > 0;
	}
}
