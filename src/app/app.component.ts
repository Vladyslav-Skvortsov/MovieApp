import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NgIf } from '@angular/common';
import { nowPlayingMovies } from '../assets/mock-data/mock-data';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MovieListComponent, NgIf],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	movies = nowPlayingMovies;

	favoriteMovies: any[] = [];
	watchMovies: any[] = [];

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
