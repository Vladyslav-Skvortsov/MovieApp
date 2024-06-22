import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { nowPlayingMovies } from '@assets/mock-data/mock-data';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MovieCardComponent } from '@components/movie-card/movie-card.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MovieListComponent, MovieCardComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public movies = nowPlayingMovies;
	public favoriteMovies: any[] = [];
	public watchMovies: any[] = [];

	addFavorite(movie: any) {
		const isMovieInFavorite = this.favoriteMovies.some(
			(favoriteMovie) => favoriteMovie.id === movie.id
		);
		if (!isMovieInFavorite) {
			this.favoriteMovies.push(movie);
		}
	}

	addWatch(movie: any) {
		const isMovieInWatch = this.watchMovies.some(
			(watchMovie) => watchMovie.id === movie.id
		);
		if (!isMovieInWatch) {
			this.watchMovies.push(movie);
		}
	}
}
