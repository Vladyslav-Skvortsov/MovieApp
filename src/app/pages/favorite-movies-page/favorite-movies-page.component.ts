import { Component, OnInit, DoCheck } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';
import { MovieService } from '@services/movie.service';

@Component({
	selector: 'app-favorite-movies-page',
	standalone: true,
	templateUrl: './favorite-movies-page.component.html',
	styleUrl: './favorite-movies-page.component.scss',
	imports: [MovieListComponent, MoviesPageComponent],
})
export class FavoriteMoviesPageComponent implements OnInit, DoCheck {
	constructor(private movieService: MovieService) {}

	public titlePage: string = 'Favorite Movies';
	public titleEmptyPage: string = 'Favorite Movies Is Empty';
	public pageType: string = 'favorite';

	public movies: any[] = [];

	ngOnInit(): void {
		this.movies = this.movieService.getFavoriteMoviesList();
	}

	ngDoCheck(): void {
		this.movies = this.movieService.getFavoriteMoviesList();
	}

	public get isMovies(): boolean {
		return this.movies.length > 0;
	}
}
