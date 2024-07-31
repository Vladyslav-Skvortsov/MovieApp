import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieService } from '@services/movie-service/movie.service';
import {
	catchError,
	map,
	mergeMap,
	Observable,
	of,
	switchMap,
	throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import * as MovieActions from '@store/actions';
import { select, Store } from '@ngrx/store';
import { selectAccountId, selectSessionId } from '@store/selectors';

@Injectable()
export class MovieEffects {
	// Generalized effect for loading movies
	loadMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				MovieActions.loadPopularMovies,
				MovieActions.loadNowPlayingMovies,
				MovieActions.loadTopRateMovies,
				MovieActions.loadUpcomingMovies
			),
			mergeMap((action) => {
				let apiCall: Observable<any>;
				let successAction: any;
				let failureAction: any;

				switch (action.type) {
					case MovieActions.loadPopularMovies.type:
						apiCall = this.movieService.getPopularMoviesList();
						successAction = MovieActions.loadPopularMoviesSuccess;
						failureAction = MovieActions.loadPopularMoviesFailure;
						break;
					case MovieActions.loadNowPlayingMovies.type:
						apiCall = this.movieService.getNowPlayingMoviesList();
						successAction = MovieActions.loadNowPlayingMoviesSuccess;
						failureAction = MovieActions.loadNowPlayingMoviesFailure;
						break;
					case MovieActions.loadTopRateMovies.type:
						apiCall = this.movieService.getTopRatedMoviesList();
						successAction = MovieActions.loadTopRateMoviesSuccess;
						failureAction = MovieActions.loadTopRateMoviesFailure;
						break;
					case MovieActions.loadUpcomingMovies.type:
						apiCall = this.movieService.getUpcomingMoviesList();
						successAction = MovieActions.loadUpcomingMoviesSuccess;
						failureAction = MovieActions.loadUpcomingMoviesFailure;
						break;
				}

				return apiCall.pipe(
					map((response) => successAction({ movies: response.results })),
					catchError((error) =>
						of(failureAction({ error: error.message }))
					)
				);
			})
		)
	);

	// Effect for handling movie detail loading
	loadMovieDetail$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadMovieDetail),
			switchMap((action) =>
				this.movieService.getMovieById(action.id).pipe(
					map((movie) => MovieActions.loadMovieDetailSuccess({ movie })),
					catchError((error) =>
						of(
							MovieActions.loadMovieDetailFailure({
								error: error.message,
							})
						)
					)
				)
			)
		)
	);

	// Generalized effect for authenticated actions
	private handleAuthenticatedRequest<T>(
		actionType: string,
		apiCall: (accountId: number, sessionId: string) => Observable<T>,
		successAction: (result: T) => any,
		failureAction: (error: string) => any
	) {
		return this.store.pipe(
			select(selectAccountId),
			switchMap((accountId) => {
				if (!accountId) {
					return of(failureAction('Not authenticated'));
				}
				return this.store.pipe(
					select(selectSessionId),
					switchMap((sessionId) => {
						if (!sessionId) {
							return of(failureAction('Not authenticated'));
						}
						return apiCall(accountId, sessionId).pipe(
							map((result) => successAction(result)),
							catchError((error) => of(failureAction(error.message)))
						);
					})
				);
			})
		);
	}

	// Effect Favorite Movies & Watch Later Movies
	// Effect for loading favorite movies
	loadFavoriteMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadFavoriteMovies),
			switchMap(() =>
				this.handleAuthenticatedRequest(
					MovieActions.loadFavoriteMovies.type,
					this.movieService.getFavoriteMoviesList.bind(this.movieService),
					(movies) => MovieActions.loadFavoriteMoviesSuccess({ movies }),
					(error) => MovieActions.loadFavoriteMoviesFailure({ error })
				)
			)
		)
	);
	// Effect for adding to favorites
	addToFavoriteMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.addToFavoriteMovies),
			switchMap((action) =>
				this.handleAuthenticatedRequest(
					MovieActions.addToFavoriteMovies.type,
					(accountId, sessionId) =>
						this.movieService.addMovieToFavorite(action.movieId),
					(movie) => MovieActions.addToFavoriteMoviesSuccess({ movie }),
					(error) => MovieActions.addToFavoriteMoviesFailure({ error })
				)
			)
		)
	);
	// Effect for removing from favorites
	removeFromFavoriteMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.removeFromFavoriteMovies),
			switchMap((action) =>
				this.handleAuthenticatedRequest(
					MovieActions.removeFromFavoriteMovies.type,
					(accountId, sessionId) =>
						this.movieService.removeMovieFromFavorite(action.movieId),
					() =>
						MovieActions.removeFromFavoriteMoviesSuccess({
							movieId: action.movieId,
						}),
					(error) =>
						MovieActions.removeFromFavoriteMoviesFailure({ error })
				)
			)
		)
	);

	// Effect for loading watch later movies
	loadWatchLaterMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadWatchLaterMovies),
			switchMap(() =>
				this.handleAuthenticatedRequest(
					MovieActions.loadWatchLaterMovies.type,
					this.movieService.getWatchMoviesList.bind(this.movieService),
					(movies) => MovieActions.loadWatchLaterMoviesSuccess({ movies }),
					(error) => MovieActions.loadWatchLaterMoviesFailure({ error })
				)
			)
		)
	);
	// Effect for adding to watch later
	addToWatchLaterMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.addToWatchLaterMovies),
			switchMap((action) =>
				this.handleAuthenticatedRequest(
					MovieActions.addToWatchLaterMovies.type,
					(accountId, sessionId) =>
						this.movieService.addMovieToWatchLater(action.movieId),
					(movie) => MovieActions.addToWatchLaterMoviesSuccess({ movie }),
					(error) => MovieActions.addToWatchLaterMoviesFailure({ error })
				)
			)
		)
	);
	// Effect for removing from watch later
	removeFromWatchLaterMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.removeFromWatchLaterMovies),
			switchMap((action) =>
				this.handleAuthenticatedRequest(
					MovieActions.removeFromWatchLaterMovies.type,
					(accountId, sessionId) =>
						this.movieService.removeMovieFromWatchLater(action.movieId),
					() =>
						MovieActions.removeFromWatchLaterMoviesSuccess({
							movieId: action.movieId,
						}),
					(error) =>
						MovieActions.removeFromWatchLaterMoviesFailure({ error })
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private movieService: MovieService,
		private store: Store
	) {}
}
