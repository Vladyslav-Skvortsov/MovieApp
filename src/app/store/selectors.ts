import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieStateInterface } from '@interfaces/state-interface';
import { Movie } from '@interfaces/movie';

export const selectMovieState =
	createFeatureSelector<MovieStateInterface>('movie');

// Selector fot get AccountId & SessionId
export const selectAccountId = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.accountId
);
export const selectSessionId = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.sessionId
);

// Check for movies in lists
export const isFavorite = (movieId: number) =>
	createSelector(selectFavoriteMovies, (favoriteMovies: Movie[]) =>
		favoriteMovies.map((movie) => movie.id).includes(movieId)
	);
export const isWatchLater = (movieId: number) =>
	createSelector(selectWatchLaterMovies, (watchLaterMovies: Movie[]) =>
		watchLaterMovies.map((movie) => movie.id).includes(movieId)
	);

export const selectPopularMovies = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.popularMoviesList || []
);
export const selectNowPlayingMovies = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.nowPlayingMoviesList || []
);
export const selectTopRateMovies = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.topRatedMoviesList || []
);
export const selectupcomingMovies = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.upcomingMoviesList || []
);
export const selectMovieDetail = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.selectedMovieDetail
);
export const selectFavoriteMovies = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.favoriteMoviesList ?? []
);
export const selectWatchLaterMovies = createSelector(
	selectMovieState,
	(state: MovieStateInterface) => state.watchLaterMoviesList ?? []
);
