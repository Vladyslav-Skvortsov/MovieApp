import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '@interfaces/movie';
import { API_KEY, BASE_API_URL } from '@constants/constant-api';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor(private httpClient: HttpClient) {}

	private favoriteMoviesList: Movie[] = [];
	private watchLaterMoviesList: Movie[] = [];

	// Checking for a movie in the list
	private isMovieInList(movie: Movie, list: Movie[]): boolean {
		return list.map((m) => m.id).includes(movie.id);
	}

	// Showing a list of films by category
	getPlayingMoviesList(): Observable<MovieResponse> {
		return this.httpClient.get<MovieResponse>(
			`${BASE_API_URL}now_playing${API_KEY}`
		);
	}
	getPopularMoviesList(): Observable<MovieResponse> {
		return this.httpClient.get<MovieResponse>(
			`${BASE_API_URL}popular${API_KEY}`
		);
	}
	getTopRatedMoviesList(): Observable<MovieResponse> {
		return this.httpClient.get<MovieResponse>(
			`${BASE_API_URL}top_rated${API_KEY}`
		);
	}
	getUpcomingMoviesList(): Observable<MovieResponse> {
		return this.httpClient.get<MovieResponse>(
			`${BASE_API_URL}upcoming${API_KEY}`
		);
	}

	// Showing a list of saved movies
	getFavoriteMoviesList(): Movie[] {
		return this.favoriteMoviesList;
	}
	getWatchMoviesList(): Movie[] {
		return this.watchLaterMoviesList;
	}

	// Adding a movie to the corresponding list
	addToFavorites(movie: Movie): void {
		const isMovie = this.isMovieInList(movie, this.favoriteMoviesList);
		if (!isMovie) {
			this.favoriteMoviesList.push(movie);
		}
	}
	addToWatchLater(movie: Movie): void {
		const isMovie = this.isMovieInList(movie, this.watchLaterMoviesList);
		if (!isMovie) {
			this.watchLaterMoviesList.push(movie);
		}
	}

	// Showing movie details
	getMovieById(id: number): Observable<Movie> {
		return this.httpClient.get<Movie>(`${BASE_API_URL}${id}${API_KEY}`);
	}

	// Removing a movie from a specific list
	removeFromFavorites(movieId: number): void {
		this.favoriteMoviesList = this.favoriteMoviesList.filter(
			(movie) => movie.id !== movieId
		);
	}
	removeFromWatchLater(movieId: number): void {
		this.watchLaterMoviesList = this.watchLaterMoviesList.filter(
			(movie) => movie.id !== movieId
		);
	}
}
