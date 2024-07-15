import { Component, DoCheck, OnInit } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MoviesPageComponent } from '@pages/movies-page/movies-page.component';
import { MovieService } from '@services/movie-service/movie.service';
import { Movie } from '@interfaces/movie';

@Component({
	selector: 'app-watch-later-page',
	standalone: true,
	templateUrl: './watch-later-page.component.html',
	styleUrl: './watch-later-page.component.scss',
	imports: [MovieListComponent, MoviesPageComponent],
})
export class WatchLaterPageComponent implements OnInit, DoCheck {
	constructor(private movieService: MovieService) {}

	public titlePage: string = 'Watch Later';
	public titleEmptyPage: string = 'Watch Later Is Empty';
	public pageType: string = 'watchLater';

	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movies = this.movieService.getWatchMoviesList();
	}

	ngDoCheck(): void {
		this.movies = this.movieService.getWatchMoviesList();
	}

	public get isMovies(): boolean {
		return this.movies.length > 0;
	}
}
