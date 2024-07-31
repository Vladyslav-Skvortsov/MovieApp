import { createReducer, on } from '@ngrx/store';
import * as MovieActions from '@store/actions';
import { initialState } from '@store/state';

export const movieReducer = createReducer(
	initialState,
	on(MovieActions.setAuthentication, (state, { accountId, sessionId }) => ({
		...state,
		accountId,
		sessionId,
	})),
	on(MovieActions.loadPopularMoviesSuccess, (state, { movies }) => ({
		...state,
		popularMoviesList: movies,
	})),
	on(MovieActions.loadNowPlayingMoviesSuccess, (state, { movies }) => ({
		...state,
		nowPlayingMoviesList: movies,
	})),
	on(MovieActions.loadTopRateMoviesSuccess, (state, { movies }) => ({
		...state,
		topRatedMoviesList: movies,
	})),
	on(MovieActions.loadUpcomingMoviesSuccess, (state, { movies }) => ({
		...state,
		upcomingMoviesList: movies,
	})),
	on(MovieActions.loadMovieDetailSuccess, (state, { movie }) => ({
		...state,
		selectedMovieDetail: movie,
	})),

	// load
	on(MovieActions.loadFavoriteMoviesSuccess, (state, { movies }) => ({
		...state,
		favoriteMoviesList: movies,
	})),
	on(MovieActions.loadFavoriteMoviesFailure, (state, { error }) => {
		console.error('Failed to load favorite movies:', error);
		return {
			...state,
			favoriteMoviesList: [],
		};
	}),

	on(MovieActions.loadWatchLaterMoviesSuccess, (state, { movies }) => ({
		...state,
		watchLaterMoviesList: movies,
	})),
	on(MovieActions.loadWatchLaterMoviesFailure, (state, { error }) => {
		console.error('Failed to load watch later movies:', error);
		return {
			...state,
			watchLaterMoviesList: [],
		};
	})
);
