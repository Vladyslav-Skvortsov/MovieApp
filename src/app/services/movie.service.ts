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

	private favoriteMoviesList: Movie[] = [];
	private watchLaterMoviesList: Movie[] = [];

	private isMovieInList(movie: Movie, list: Movie[]): boolean {
		return list.map((m) => m.id).includes(movie.id);
	}

	getPlayingMoviesList() {
		return nowPlayingMovies;
	}
	getPopularMoviesList() {
		return popularMovies;
	}
	getTopRatedMoviesList() {
		return topRatedMovies;
	}
	getUpcomingMoviesList() {
		return upcomingMovies;
	}

	getFavoriteMoviesList() {
		return this.favoriteMoviesList;
	}
	getWatchMoviesList() {
		return this.watchLaterMoviesList;
	}

	addToFavorites(movie: Movie): void {
		const isMovie = this.isMovieInList(movie, this.favoriteMoviesList);
		!isMovie && this.favoriteMoviesList.push(movie);
	}
	addToWatchLater(movie: Movie): void {
		const isMovie = this.isMovieInList(movie, this.watchLaterMoviesList);
		!isMovie && this.watchLaterMoviesList.push(movie);
	}

	getMovieById(id: number) {
		const allMovies = [
			...nowPlayingMovies,
			...popularMovies,
			...topRatedMovies,
			...upcomingMovies,
		];
		const movie = allMovies.find((movie) => movie.id === id);
		return of(movie);
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
