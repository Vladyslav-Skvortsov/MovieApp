import { Component, EventEmitter, Output } from '@angular/core';
import { topRatedMovies } from '@assets/database/mock-data';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

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

	movies = topRatedMovies;

	addToFavorites(movie: any) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: any) {
		this.addWatch.emit(movie);
	}
}
