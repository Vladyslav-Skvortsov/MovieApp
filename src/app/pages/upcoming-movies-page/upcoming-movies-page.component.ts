import { Component, EventEmitter, Output } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { upcomingMovies } from '@assets/database/mock-data';

@Component({
	selector: 'app-upcoming-movies-page',
	standalone: true,
	templateUrl: './upcoming-movies-page.component.html',
	styleUrl: './upcoming-movies-page.component.scss',
	imports: [MovieListComponent],
})
export class UpcomingMoviesPageComponent {
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	movies = upcomingMovies;

	addToFavorites(movie: any) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: any) {
		this.addWatch.emit(movie);
	}
}
