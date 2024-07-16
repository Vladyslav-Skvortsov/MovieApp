import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { MovieService } from '@services/movie-service/movie.service';
import { Movie } from '@interfaces/movie';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-favorite-movies-page',
	standalone: true,
	templateUrl: './favorite-movies-page.component.html',
	styleUrl: './favorite-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class FavoriteMoviesPageComponent implements OnInit, OnDestroy {
	constructor(private movieService: MovieService) {}

	public titlePage: string = 'Favorite Movies';
	public titleEmptyPage: string = 'Favorite Movies Is Empty';
	public pageType: string = 'favorite';

	public movies: Movie[] = [];

	private unsubscribe$ = new Subject<void>();

	ngOnInit(): void {
		this.movieService
			.getFavoriteMoviesList()
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
