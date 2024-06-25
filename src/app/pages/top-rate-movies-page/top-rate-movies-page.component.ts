import { Component, EventEmitter, Output } from '@angular/core';
import { topRatedMovies } from '@assets/database/mock-data';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '@interfaces/movie';

@Component({
	selector: 'app-top-rate-movies-page',
	standalone: true,
	templateUrl: './top-rate-movies-page.component.html',
	styleUrl: './top-rate-movies-page.component.scss',
	imports: [MovieListComponent],
})
export class TopRateMoviesPageComponent {
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	public titlePage: string = 'Top Rate Movies';

	movies = topRatedMovies;

	addToFavorites(movie: Movie) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: Movie) {
		this.addWatch.emit(movie);
	}
}
