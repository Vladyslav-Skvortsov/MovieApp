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
	private watchLaterMoviesList: Movie[] = [];

	private isMovieInList(movie: Movie, list: Movie[]): boolean {
		return list.some((m) => m.id === movie.id);
	}

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
		return this.watchLaterMoviesList;
	}

	addToFavorites(movie: Movie): void {
		let isMovie = this.isMovieInList(movie, this.favoriteMoviesList);
		if (!isMovie) {
			this.favoriteMoviesList.push(movie);
		}
	}
	addToWatchLater(movie: Movie): void {
		let isMovie = this.isMovieInList(movie, this.watchLaterMoviesList);
		if (!isMovie) {
			this.watchLaterMoviesList.push(movie);
		}
	}

	getMovieById(id: number) {
		const allMovies = [
			...this.playingMoviesList,
			...this.popularMoviesList,
			...this.topRatedMoviesList,
			...this.upcomingMoviesList,
		];
		const movie = allMovies.find((movie) => movie.id === id);
		return of(movie); // не знав як це зробити красиво тому знайшов таке рiшення :D --- Observable
		// хоча не до кінця розумію як це взагалі працює
	}

	removeFromFavorites(movieId: number) {
		this.favoriteMoviesList = this.favoriteMoviesList.filter(
			(movie) => movie.id !== movieId
		);
	}
	removeFromWatchLater(movieId: number) {
		this.watchLaterMoviesList = this.watchLaterMoviesList.filter(
			(movie) => movie.id !== movieId
		);
	}
}
