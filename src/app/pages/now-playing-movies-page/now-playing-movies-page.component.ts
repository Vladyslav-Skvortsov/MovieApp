import { Component, EventEmitter, Output } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { nowPlayingMovies } from '@assets/database/mock-data';

@Component({
	selector: 'app-now-playing-movies-page',
	standalone: true,
	templateUrl: './now-playing-movies-page.component.html',
	styleUrl: './now-playing-movies-page.component.scss',
	imports: [MovieListComponent],
})
export class NowPlayingMoviesPageComponent {
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	movies = nowPlayingMovies;

	addToFavorites(movie: any) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: any) {
		this.addWatch.emit(movie);
	}
}
