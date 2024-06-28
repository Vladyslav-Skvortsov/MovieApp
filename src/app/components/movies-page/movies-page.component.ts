import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { Movie } from '@interfaces/movie';

@Component({
	selector: 'app-movies-page',
	standalone: true,
	imports: [MovieListComponent],
	templateUrl: './movies-page.component.html',
	styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent {
	@Input() titlePage: string = '';
	@Input() movies: Movie[] = [];
	@Output() addFavorite = new EventEmitter<Movie>();
	@Output() addWatch = new EventEmitter<Movie>();

	addToFavorites(movie: Movie) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: Movie) {
		this.addWatch.emit(movie);
	}
}
