import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
	nowPlayingMovies,
	popularMovies,
	topRatedMovies,
	upcomingMovies,
} from '@assets/database/mock-data';
import { Movie } from '@interfaces/movie';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor() {}

	private playingMoviesList: Movie[] = nowPlayingMovies;
	private popularMoviesList: Movie[] = popularMovies;
	private topRatedMoviesList: Movie[] = topRatedMovies;
	private upcomingMoviesList: Movie[] = upcomingMovies;

	private favoriteMoviesList: Movie[] = [];
	private watchMoviesList: Movie[] = [];

	getPlayingMoviesList() {
		return this.playingMoviesList;
	}
	getPopularMoviesList() {
		return this.popularMoviesList;
	}
	getTopRatedMoviesList() {
		return this.topRatedMoviesList;
	}
	getUpcomingMoviesList() {
		return this.upcomingMoviesList;
	}

	getFavoriteMoviesList() {
		return this.favoriteMoviesList;
	}
	getWatchMoviesList() {
		return this.watchMoviesList;
	}

	getMovieById(id: number) {
		const allMovies = [
			...this.playingMoviesList,
			...this.popularMoviesList,
			...this.topRatedMoviesList,
			...this.upcomingMoviesList,
		];
		const movie = allMovies.find((movie) => movie.id === id);
		return of(movie); // не знав як це зробити тому знайшов таке рiшення --- Observable
	}

	// removeFromFavorites(movie: any) {
	// 	this.favoriteMoviesList = this.favoriteMoviesList.filter(
	// 		(m) => m.id !== movie.id
	// 	);
	// }

	// removeFromWatchList(movie: any) {
	// 	this.watchMoviesList = this.watchMoviesList.filter(
	// 		(m) => m.id !== movie.id
	// 	);
	// }
}
