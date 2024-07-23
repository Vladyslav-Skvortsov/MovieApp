import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Movie, MovieResponse } from '@interfaces/movie';
import {
	API_KEY,
	BASE_API_URL,
	BASE_MOVIE_API_URL,
} from '@constants/constant-api';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor(private httpClient: HttpClient) {}

	private accountId: number | null = null;
	private sessionId: string | null = null;

	setAccountId(id: number) {
		this.accountId = id;
	}
	setSessionId(id: string) {
		this.sessionId = id;
	}

	// Showing a list of films by category
	getPlayingMoviesList(): Observable<MovieResponse> {
		const url: string = `${BASE_MOVIE_API_URL}now_playing${API_KEY}`;
		return this.httpClient
			.get<MovieResponse>(url)
			.pipe(catchError(this.handleError));
	}
	getPopularMoviesList(): Observable<MovieResponse> {
		const url: string = `${BASE_MOVIE_API_URL}popular${API_KEY}`;
		return this.httpClient
			.get<MovieResponse>(url)
			.pipe(catchError(this.handleError));
	}
	getTopRatedMoviesList(): Observable<MovieResponse> {
		const url: string = `${BASE_MOVIE_API_URL}top_rated${API_KEY}`;
		return this.httpClient
			.get<MovieResponse>(url)
			.pipe(catchError(this.handleError));
	}
	getUpcomingMoviesList(): Observable<MovieResponse> {
		const url: string = `${BASE_MOVIE_API_URL}upcoming${API_KEY}`;
		return this.httpClient
			.get<MovieResponse>(url)
			.pipe(catchError(this.handleError));
	}

	// Showing a list of saved movies
	getFavoriteMoviesList(): Observable<Movie[]> {
		if (!this.accountId || !this.sessionId) {
			return throwError('Not authenticated');
		}

		const url = `${BASE_API_URL}/account/${this.accountId}/favorite/movies${API_KEY}&session_id=${this.sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
			catchError(this.handleError)
		);
	}
	getWatchMoviesList(): Observable<Movie[]> {
		if (!this.accountId || !this.sessionId) {
			return throwError('Not authenticated');
		}

		const url = `${BASE_API_URL}/account/${this.accountId}/watchlist/movies${API_KEY}&session_id=${this.sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
			catchError(this.handleError)
		);
	}

	// Adding a movie to the corresponding list
	addToFavorites(movie: Movie): Observable<Movie> {
		if (!this.accountId || !this.sessionId) {
			return throwError('Not authenticated');
		}
		const url = `${BASE_API_URL}/account/${this.accountId}/favorite${API_KEY}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movie.id,
			favorite: true,
		};

		return this.httpClient
			.post<Movie>(url, body)
			.pipe(catchError(this.handleError));
	}
	addToWatchLater(movie: Movie): Observable<Movie> {
		if (!this.accountId || !this.sessionId) {
			return throwError('Not authenticated');
		}
		const url = `${BASE_API_URL}/account/${this.accountId}/watchlist${API_KEY}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movie.id,
			watchlist: true,
		};

		return this.httpClient
			.post<Movie>(url, body)
			.pipe(catchError(this.handleError));
	}

	// Showing movie details
	getMovieById(id: number): Observable<Movie> {
		return this.httpClient
			.get<Movie>(`${BASE_MOVIE_API_URL}${id}${API_KEY}`)
			.pipe(catchError(this.handleError));
	}

	// Removing a movie from a specific list
	removeFromFavorites(movieId: number): Observable<Movie> {
		if (!this.accountId || !this.sessionId) {
			return throwError('Not authenticated');
		}
		const url = `${BASE_API_URL}/account/${this.accountId}/favorite${API_KEY}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movieId,
			favorite: false,
		};

		return this.httpClient
			.post<Movie>(url, body)
			.pipe(catchError(this.handleError));
	}
	removeFromWatchLater(movieId: number): Observable<Movie> {
		if (!this.accountId || !this.sessionId) {
			return throwError('Not authenticated');
		}
		const url = `${BASE_API_URL}/account/${this.accountId}/watchlist${API_KEY}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movieId,
			watchlist: false,
		};

		return this.httpClient
			.post<Movie>(url, body)
			.pipe(catchError(this.handleError));
	}

	// Error
	private handleError(error: HttpErrorResponse): Observable<never> {
		console.error('An error occurred:', error.message);
		return throwError(error.message || 'Server error');
	}
}
