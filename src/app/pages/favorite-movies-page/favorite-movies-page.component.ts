import { Component, OnInit, DoCheck } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { MovieService } from '@services/movie-service/movie.service';
import { Movie } from '@interfaces/movie';
import { switchMap, takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@directives/clear-observable/clear-observable.directive';

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
	constructor(private movieService: MovieService) {
		super();
	}

	public titlePage: string = 'Favorite Movies';
	public titleEmptyPage: string = 'Favorite Movies Is Empty';
	public pageType: string = 'favorite';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movieService
			.getFavoriteMoviesList()
			.pipe(
				switchMap(() => this.movieService.getFavoriteMovies()),
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
