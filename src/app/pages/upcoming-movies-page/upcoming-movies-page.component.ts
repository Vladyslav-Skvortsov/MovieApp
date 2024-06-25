import { Component, EventEmitter, Output } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { upcomingMovies } from '@assets/database/mock-data';
import { Movie } from '@interfaces/movie';

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

	public titlePage: string = 'Upcoming Movies';

	movies = upcomingMovies;

	addToFavorites(movie: Movie) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: Movie) {
		this.addWatch.emit(movie);
	}
}
