import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie-service/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';

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
	constructor(private movieService: MovieService) {
		super();
	}

	public titlePage: string = 'Popular Movies';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movieService
			.getPopularMoviesList()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((response) => {
				this.movies = response.results;
			});
	}
}
