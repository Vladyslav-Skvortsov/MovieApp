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

	// load Favorite Movies & Watch Later Movies
	// load Favorite Movies
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
	// Adding a movie to favorites
	on(MovieActions.addToFavoriteMoviesSuccess, (state, { movie }) => ({
		...state,
		favoriteMoviesList: state.favoriteMoviesList
			? [...state.favoriteMoviesList, movie]
			: [movie],
	})),
	on(MovieActions.addToFavoriteMoviesFailure, (state, { error }) => {
		console.error('Failed to add to favorite movies:', error);
		return state;
	}),
	// Remove from favorites
	on(MovieActions.removeFromFavoriteMoviesSuccess, (state, { movieId }) => ({
		...state,
		favoriteMoviesList: state.favoriteMoviesList
			? state.favoriteMoviesList.filter((movie) => movie.id !== movieId)
			: [],
	})),
	on(MovieActions.removeFromFavoriteMoviesFailure, (state, { error }) => {
		console.error('Failed to remove from favorite movies:', error);
		return state;
	}),

	// load Watch Later Movies
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
	}),
	// Adding a movie to the "Watch Later" list
	on(MovieActions.addToWatchLaterMoviesSuccess, (state, { movie }) => ({
		...state,
		watchLaterMoviesList: state.watchLaterMoviesList
			? [...state.watchLaterMoviesList, movie]
			: [movie],
	})),
	on(MovieActions.addToWatchLaterMoviesFailure, (state, { error }) => {
		console.error('Failed to add to watch later movies:', error);
		return state;
	}),
	// Remove from watch later
	on(MovieActions.removeFromWatchLaterMoviesSuccess, (state, { movieId }) => {
		return {
			...state,
			watchLaterMoviesList: state.watchLaterMoviesList
				? state.watchLaterMoviesList.filter((movie) => movie.id !== movieId)
				: [],
		};
	}),
	on(MovieActions.removeFromWatchLaterMoviesFailure, (state, { error }) => {
		console.error('Failed to remove from watch later movies:', error);
		return state;
	})
);
