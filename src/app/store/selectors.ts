import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from '@store/state';

export const selectMovieState = createFeatureSelector<MovieState>('movie');

// Selector fot get AccountId & SessionId
export const selectAccountId = createSelector(
	selectMovieState,
	(state: MovieState) => state.accountId
);
export const selectSessionId = createSelector(
	selectMovieState,
	(state: MovieState) => state.sessionId
);

export const selectPopularMovies = createSelector(
	selectMovieState,
	(state: MovieState) => state.popularMoviesList || []
);
export const selectNowPlayingMovies = createSelector(
	selectMovieState,
	(state: MovieState) => state.nowPlayingMoviesList || []
);
export const selectTopRateMovies = createSelector(
	selectMovieState,
	(state: MovieState) => state.topRatedMoviesList || []
);
export const selectupcomingMovies = createSelector(
	selectMovieState,
	(state: MovieState) => state.upcomingMoviesList || []
);
export const selectMovieDetail = createSelector(
	selectMovieState,
	(state: MovieState) => state.selectedMovieDetail
);
export const selectFavoriteMovies = createSelector(
	selectMovieState,
	(state: MovieState) => state.favoriteMoviesList ?? []
);
export const selectWatchLaterMovies = createSelector(
	selectMovieState,
	(state: MovieState) => state.watchLaterMoviesList ?? []
);
