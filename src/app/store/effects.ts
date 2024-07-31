import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieService } from '@services/movie-service/movie.service';
import { catchError, map, mergeMap, of, switchMap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import * as MovieActions from '@store/actions';
import { select, Store } from '@ngrx/store';
import { MovieState } from '@store/state';
import { selectAccountId, selectSessionId } from '@store/selectors';

@Injectable()
export class MovieEffects {
	// Effect a list of films by category
	loadPopularMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadPopularMovies),
			mergeMap(() =>
				this.movieService.getPopularMoviesList().pipe(
					map((response) =>
						MovieActions.loadPopularMoviesSuccess({
							movies: response.results,
						})
					),
					catchError((error) =>
						of(
							MovieActions.loadPopularMoviesFailure({
								error: error.message,
							})
						)
					)
				)
			)
		)
	);
	loadNowPlayingMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadNowPlayingMovies),
			mergeMap(() =>
				this.movieService.getNowPlayingMoviesList().pipe(
					map((response) =>
						MovieActions.loadNowPlayingMoviesSuccess({
							movies: response.results,
						})
					),
					catchError((error) =>
						of(
							MovieActions.loadNowPlayingMoviesFailure({
								error: error.message,
							})
						)
					)
				)
			)
		)
	);
	loadTopRateMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadTopRateMovies),
			mergeMap(() =>
				this.movieService.getTopRatedMoviesList().pipe(
					map((response) =>
						MovieActions.loadTopRateMoviesSuccess({
							movies: response.results,
						})
					),
					catchError((error) =>
						of(
							MovieActions.loadTopRateMoviesFailure({
								error: error.message,
							})
						)
					)
				)
			)
		)
	);
	loadUpcomingMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadUpcomingMovies),
			mergeMap(() =>
				this.movieService.getUpcomingMoviesList().pipe(
					map((response) =>
						MovieActions.loadUpcomingMoviesSuccess({
							movies: response.results,
						})
					),
					catchError((error) =>
						of(
							MovieActions.loadUpcomingMoviesFailure({
								error: error.message,
							})
						)
					)
				)
			)
		)
	);
	loadMovieDetail$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadMovieDetail),
			mergeMap((action) =>
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

	// Effect Favorite Movies & Watch Later Movies
	// Load Favorite Movies & Watch Later Movies

	loadFavoriteMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadFavoriteMovies),
			switchMap(() =>
				this.store.pipe(
					select(selectAccountId),
					switchMap((accountId) => {
						if (!accountId) {
							return throwError('Not authenticated');
						}
						return this.store.pipe(
							select(selectSessionId),
							switchMap((sessionId) => {
								if (!sessionId) {
									return throwError('Not authenticated');
								}
								return this.movieService.getFavoriteMoviesList().pipe(
									map((movies) =>
										MovieActions.loadFavoriteMoviesSuccess({ movies })
									),
									catchError((error) => {
										console.error(
											'Failed to load favorite movies:',
											error
										);
										return of(
											MovieActions.loadFavoriteMoviesFailure({
												error: error.message,
											})
										);
									})
								);
							})
						);
					})
				)
			)
		)
	);

	loadWatchLaterMovies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.loadWatchLaterMovies),
			switchMap(() =>
				this.store.pipe(
					select(selectAccountId),
					switchMap((accountId) => {
						if (!accountId) {
							return throwError('Not authenticated');
						}
						return this.store.pipe(
							select(selectSessionId),
							switchMap((sessionId) => {
								if (!sessionId) {
									return throwError('Not authenticated');
								}
								return this.movieService.getWatchMoviesList().pipe(
									map((movies) =>
										MovieActions.loadWatchLaterMoviesSuccess({
											movies,
										})
									),
									catchError((error) => {
										console.error(
											'Failed to load watch later movies:',
											error
										);
										return of(
											MovieActions.loadWatchLaterMoviesFailure({
												error: error.message,
											})
										);
									})
								);
							})
						);
					})
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private movieService: MovieService,
		private store: Store<MovieState>
	) {}
}
