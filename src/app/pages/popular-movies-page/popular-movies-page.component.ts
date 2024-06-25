import { Component, EventEmitter, Input, Output } from '@angular/core';
import { popularMovies } from '@assets/database/mock-data';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
	selector: 'app-popular-movies-page',
	standalone: true,
	templateUrl: './popular-movies-page.component.html',
	styleUrl: './popular-movies-page.component.scss',
	imports: [MovieListComponent],
})
export class PopularMoviesPageComponent {
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	movies = popularMovies;

	addToFavorites(movie: any) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: any) {
		this.addWatch.emit(movie);
	}
}
