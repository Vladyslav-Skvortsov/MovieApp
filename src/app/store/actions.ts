import { Movie } from '@interfaces/movie';
import { createAction, props } from '@ngrx/store';

// Set Authentication
export const setAuthentication = createAction(
	'[Auth] Set Authentication',
	props<{ accountId: number; sessionId: string }>()
);

// Popular Movies Actions
export const loadPopularMovies = createAction(
	'[Movies Page] Load Popular Movies'
);
export const loadPopularMoviesSuccess = createAction(
	'[Movies API] Popular Movies Loaded Success',
	props<{ movies: Movie[] }>()
);
export const loadPopularMoviesFailure = createAction(
	'[Movies API] Popular Movies Loaded Failure',
	props<{ error: string }>()
);

// Now Playing Movies Actions
export const loadNowPlayingMovies = createAction(
	'[Movies Page] Load Now Playing Movies'
);
export const loadNowPlayingMoviesSuccess = createAction(
	'[Movies Page] Load Now Playing Movies Success',
	props<{ movies: Movie[] }>()
);
export const loadNowPlayingMoviesFailure = createAction(
	'[Movies API] Load Now Playing Movies Failure',
	props<{ error: string }>()
);

// Top Rated Movies Actions
export const loadTopRateMovies = createAction(
	'[Movies Page] Load Top Rate Movies'
);
export const loadTopRateMoviesSuccess = createAction(
	'[Movies Page] Load Top Rate Movies Success',
	props<{ movies: Movie[] }>()
);
export const loadTopRateMoviesFailure = createAction(
	'[Movies API] Load Top Rate Movies Failure',
	props<{ error: string }>()
);

// Upcoming Movies Actions
export const loadUpcomingMovies = createAction(
	'[Movies Page] Load Upcoming Movies'
);
export const loadUpcomingMoviesSuccess = createAction(
	'[Movies Page] Load Upcoming Movies Success',
	props<{ movies: Movie[] }>()
);
export const loadUpcomingMoviesFailure = createAction(
	'[Movies API] Load Upcoming Movies Failure',
	props<{ error: string }>()
);

// Movie Detail Actions
export const loadMovieDetail = createAction(
	'[Movie Detail Page] Load Movie Detail',
	props<{ id: number }>()
);
export const loadMovieDetailSuccess = createAction(
	'[Movie API] Load Movie Detail Success',
	props<{ movie: Movie }>()
);
export const loadMovieDetailFailure = createAction(
	'[Movie API] Load Movie Detail Failure',
	props<{ error: string }>()
);

// Load Favorite Movies
export const loadFavoriteMovies = createAction('[Movies] Load Favorite Movies');
export const loadFavoriteMoviesSuccess = createAction(
	'[Movies] Load Favorite Movies Success',
	props<{ movies: Movie[] }>()
);
export const loadFavoriteMoviesFailure = createAction(
	'[Movies] Load Favorite Movies Failure',
	props<{ error: string }>()
);

// Load Watch Later Movies
export const loadWatchLaterMovies = createAction(
	'[Movies] Load Watch Later Movies'
);
export const loadWatchLaterMoviesSuccess = createAction(
	'[Movies] Load Watch Later Movies Success',
	props<{ movies: Movie[] }>()
);
export const loadWatchLaterMoviesFailure = createAction(
	'[Movies] Load Watch Later Movies Failure',
	props<{ error: string }>()
);
