import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieService } from '@services/movie-service/movie.service';
import {
	catchError,
	map,
	mergeMap,
	switchMap,
	tap,
	of,
	Observable,
} from 'rxjs';
import { Injectable } from '@angular/core';
import * as MovieActions from '@store/actions';
import { Action, Store, select } from '@ngrx/store';
import { selectAccountId, selectSessionId } from '@store/selectors';
import { Movie } from '@interfaces/movie';

// Interfaces for success and error actions
interface SuccessAction {
	(props: { movies: Movie[] }): Action;
}
interface FailureAction {
	(props: { error: string }): Action;
}

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
			mergeMap((action): Observable<Action> => {
				let apiCall: Observable<{ results: Movie[] }>;
				let successAction: SuccessAction;
				let failureAction: FailureAction;

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
					default:
						return of({ type: 'NO_ACTION' });
				}

				return apiCall.pipe(
					map((response) => successAction({ movies: response.results })),
					catchError((error) =>
						of(
							failureAction({ error: error.message }),
							MovieActions.showErrorMessage({
								detail: 'Failed to load movies.',
							})
						)
					)
				);
			})
		)
	);

	// Effect for preloading Favorites and Watch Later lists
	loadInitialData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				MovieActions.loadPopularMovies,
				MovieActions.loadNowPlayingMovies,
				MovieActions.loadTopRateMovies,
				MovieActions.loadUpcomingMovies
			),
			mergeMap(() => [
				MovieActions.loadFavoriteMovies(),
				MovieActions.loadWatchLaterMovies(),
			])
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
							}),
							MovieActions.showErrorMessage({
								detail: 'Failed to load movie details.',
							})
						)
					)
				)
			)
		)
	);

	// Generalized effect for authenticated actions
	private handleAuthenticatedRequest<T>(
		apiCall: (accountId: number, sessionId: string) => Observable<T>,
		successAction: (result: T) => any,
		failureAction: (error: string) => any
	) {
		return this.store.pipe(
			select(selectAccountId),
			switchMap((accountId) => {
				if (!accountId) {
					console.error('Not authenticated.');
					return of(failureAction('Not authenticated'));
				}
				return this.store.pipe(
					select(selectSessionId),
					switchMap((sessionId) => {
						if (!sessionId) {
							console.error('Not authenticated.');
							return of(failureAction('Not authenticated'));
						}
						return apiCall(accountId, sessionId).pipe(
							map((result) => successAction(result)),
							catchError((error) =>
								of(
									failureAction(error.message),
									MovieActions.showErrorMessage({
										detail: 'Operation failed.',
									})
								)
							)
						);
					})
				);
			})
		);
	}

	// Effect for loading favorite movies
	loadFavoriteMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadFavoriteMovies),
			switchMap(() =>
				this.handleAuthenticatedRequest(
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
					(accountId, sessionId) =>
						this.movieService.addMovieToFavorite(action.movieId),
					(movie) => MovieActions.addToFavoriteMoviesSuccess({ movie }),
					(error) => MovieActions.addToFavoriteMoviesFailure({ error })
				).pipe(
					tap((resultAction) => {
						if (
							resultAction.type ===
							MovieActions.addToFavoriteMoviesSuccess.type
						) {
							this.store.dispatch(
								MovieActions.showSuccessMessage({
									detail: 'Movie added to favorites.',
								})
							);
						} else {
							this.store.dispatch(
								MovieActions.showErrorMessage({
									detail: 'Failed to add movie to favorites.',
								})
							);
						}
					})
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
					(accountId, sessionId) =>
						this.movieService.removeMovieFromFavorite(action.movieId),
					() =>
						MovieActions.removeFromFavoriteMoviesSuccess({
							movieId: action.movieId,
						}),
					(error) =>
						MovieActions.removeFromFavoriteMoviesFailure({ error })
				).pipe(
					tap((resultAction) => {
						if (
							resultAction.type ===
							MovieActions.removeFromFavoriteMoviesSuccess.type
						) {
							this.store.dispatch(
								MovieActions.showSuccessMessage({
									detail: 'Movie removed from favorites.',
								})
							);
						} else {
							this.store.dispatch(
								MovieActions.showErrorMessage({
									detail: 'Failed to remove movie from favorites.',
								})
							);
						}
					})
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
					(accountId, sessionId) =>
						this.movieService.addMovieToWatchLater(action.movieId),
					(movie) => MovieActions.addToWatchLaterMoviesSuccess({ movie }),
					(error) => MovieActions.addToWatchLaterMoviesFailure({ error })
				).pipe(
					tap((resultAction) => {
						if (
							resultAction.type ===
							MovieActions.addToWatchLaterMoviesSuccess.type
						) {
							this.store.dispatch(
								MovieActions.showSuccessMessage({
									detail: 'Movie added to watch later.',
								})
							);
						} else {
							this.store.dispatch(
								MovieActions.showErrorMessage({
									detail: 'Failed to add movie to watch later.',
								})
							);
						}
					})
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
					(accountId, sessionId) =>
						this.movieService.removeMovieFromWatchLater(action.movieId),
					() =>
						MovieActions.removeFromWatchLaterMoviesSuccess({
							movieId: action.movieId,
						}),
					(error) =>
						MovieActions.removeFromWatchLaterMoviesFailure({ error })
				).pipe(
					tap((resultAction) => {
						if (
							resultAction.type ===
							MovieActions.removeFromWatchLaterMoviesSuccess.type
						) {
							this.store.dispatch(
								MovieActions.showSuccessMessage({
									detail: 'Movie removed from watch later.',
								})
							);
						} else {
							this.store.dispatch(
								MovieActions.showErrorMessage({
									detail: 'Failed to remove movie from watch later.',
								})
							);
						}
					})
				)
			)
		)
	);

	// subscribe & unsubscribe news
	subscribe$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MovieActions.subscribe),
				tap(() => {
					this.store.dispatch(
						MovieActions.showSuccessMessage({
							detail: 'Subscription successful!',
						})
					);
				})
			),
		{ dispatch: false }
	);
	unsubscribe$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MovieActions.unsubscribe),
				tap(() => {
					this.store.dispatch(
						MovieActions.showSuccessMessage({
							detail: 'You have unsubscribed.',
						})
					);
				})
			),
		{ dispatch: false }
	);

	constructor(
		private actions$: Actions,
		private movieService: MovieService,
		private store: Store
	) {}
}
