import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { Movie, MovieResponse } from '@interfaces/movie';
import { API_KEY, BASE_API_URL } from '@constants/constant-api';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor(private httpClient: HttpClient) {}

	private favoriteMoviesSubject = new BehaviorSubject<Movie[]>([]);
	private watchLaterMoviesSubject = new BehaviorSubject<Movie[]>([]);

	// Checking for a movie in the list
	private isMovieInList(
		movie: Movie,
		list: BehaviorSubject<Movie[]>
	): boolean {
		return list.getValue().includes(movie);
	}

	// Showing a list of films by category
	getPlayingMoviesList(): Observable<MovieResponse> {
		const fullUrl: string = `${BASE_API_URL}now_playing${API_KEY}`;

		return this.httpClient.get<MovieResponse>(fullUrl);
	}
	getPopularMoviesList(): Observable<MovieResponse> {
		const fullUrl: string = `${BASE_API_URL}popular${API_KEY}`;

		return this.httpClient.get<MovieResponse>(fullUrl);
	}
	getTopRatedMoviesList(): Observable<MovieResponse> {
		const fullUrl: string = `${BASE_API_URL}top_rated${API_KEY}`;

		return this.httpClient.get<MovieResponse>(fullUrl);
	}
	getUpcomingMoviesList(): Observable<MovieResponse> {
		const fullUrl: string = `${BASE_API_URL}upcoming${API_KEY}`;

		return this.httpClient.get<MovieResponse>(fullUrl);
	}

	// Showing a list of saved movies
	getFavoriteMoviesList(): Observable<Movie[]> {
		return this.favoriteMoviesSubject.asObservable();
	}
	getWatchMoviesList(): Observable<Movie[]> {
		return this.watchLaterMoviesSubject.asObservable();
	}

	// Adding a movie to the corresponding list
	addToFavorites(movie: Movie): void {
		if (!this.isMovieInList(movie, this.favoriteMoviesSubject)) {
			const updatedFavorites = [
				...this.favoriteMoviesSubject.getValue(),
				movie,
			];
			this.favoriteMoviesSubject.next(updatedFavorites);
		}
	}
	addToWatchLater(movie: Movie): void {
		if (!this.isMovieInList(movie, this.watchLaterMoviesSubject)) {
			const updatedWatchLater = [
				...this.watchLaterMoviesSubject.getValue(),
				movie,
			];
			this.watchLaterMoviesSubject.next(updatedWatchLater);
		}
	}

	// Showing movie details
	getMovieById(id: number): Observable<Movie> {
		return this.httpClient.get<Movie>(`${BASE_API_URL}${id}${API_KEY}`);
	}

	// Removing a movie from a specific list
	removeFromFavorites(movieId: number): void {
		const updatedFavorites = this.favoriteMoviesSubject
			.getValue()
			.filter((movie) => movie.id !== movieId);
		this.favoriteMoviesSubject.next(updatedFavorites);
	}
	removeFromWatchLater(movieId: number): void {
		const updatedWatchLater = this.watchLaterMoviesSubject
			.getValue()
			.filter((movie) => movie.id !== movieId);
		this.watchLaterMoviesSubject.next(updatedWatchLater);
	}
}
