import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
	BehaviorSubject,
	catchError,
	map,
	Observable,
	switchMap,
	throwError,
} from 'rxjs';
import { Movie, MovieResponse } from '@interfaces/movie';
import {
	API_KEY,
	BASE_API_URL,
	BASE_MOVIE_API_URL,
} from '@constants/constant-api';
import { select, Store } from '@ngrx/store';
import { selectAccountId, selectSessionId } from '@store/selectors';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor(private httpClient: HttpClient, private store: Store) {}

	// Showing a list of films by category
	getNowPlayingMoviesList(): Observable<MovieResponse> {
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
	getFavoriteMoviesList(
		accountId: number,
		sessionId: string
	): Observable<Movie[]> {
		const url = `${BASE_API_URL}/account/${accountId}/favorite/movies${API_KEY}&session_id=${sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
			catchError(this.handleError)
		);
	}
	getWatchMoviesList(
		accountId: number,
		sessionId: string
	): Observable<Movie[]> {
		const url = `${BASE_API_URL}/account/${accountId}/watchlist/movies${API_KEY}&session_id=${sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
			catchError(this.handleError)
		);
	}

	// Adding a movie to the corresponding list

	// Removing a movie from a specific list

	// Showing movie details
	getMovieById(id: number): Observable<Movie> {
		return this.httpClient
			.get<Movie>(`${BASE_MOVIE_API_URL}${id}${API_KEY}`)
			.pipe(catchError(this.handleError));
	}

	// Error handling
	private handleError(error: HttpErrorResponse): Observable<never> {
		console.error('An error occurred:', error.message);
		return throwError(error.message || 'Server error');
	}
}
