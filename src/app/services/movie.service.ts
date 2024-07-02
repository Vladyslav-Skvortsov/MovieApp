import { Injectable } from '@angular/core';
import {
	nowPlayingMovies,
	popularMovies,
	topRatedMovies,
	upcomingMovies,
} from '@assets/database/mock-data';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor() {}

	public playingMoviesList: any[] = nowPlayingMovies;
	public popularMoviesList: any[] = popularMovies;
	public topRatedMoviesList: any[] = topRatedMovies;
	public upcomingMoviesList: any[] = upcomingMovies;

	public favoriteMoviesList: any[] = [];
	public watchMoviesList: any[] = [];

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

	// addToFavorites(movie: any) {
	// 	if (!this.favoriteMoviesList.includes(movie)) {
	// 		this.favoriteMoviesList.push(movie);
	// 	}
	// }

	// addToWatchList(movie: any) {
	// 	if (!this.watchMoviesList.includes(movie)) {
	// 		this.watchMoviesList.push(movie);
	// 	}
	// }

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
