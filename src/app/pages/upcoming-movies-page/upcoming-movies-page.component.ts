import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie-service/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '@directives/clear-observable/clear-observable.directive';

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
	constructor(private movieService: MovieService) {
		super();
	}

	public titlePage: string = 'Upcoming Movies';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movieService
			.getUpcomingMoviesList()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((response) => {
				this.movies = response.results;
			});
	}
}
