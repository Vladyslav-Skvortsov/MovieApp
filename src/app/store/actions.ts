import { Movie } from '@interfaces/movie';
import { Subscription } from '@interfaces/state-interface';
import { createAction, props } from '@ngrx/store';

// Set Authentication
export const setAuthentication = createAction(
	'[Auth] Set Authentication',
	props<{ accountId: number; sessionId: string }>()
);
export const clearAuthentication = createAction('[Auth] Clear Authentication');

// Actions for success messages
export const showSuccessMessage = createAction(
	'[Movie] Show Success Message',
	props<{ detail: string }>()
);
// Actions for error messages
export const showErrorMessage = createAction(
	'[Movie] Show Error Message',
	props<{ detail: string }>()
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
// Adding a movie to favorites
export const addToFavoriteMovies = createAction(
	'[Movies] Add To Favorite Movies',
	props<{ movieId: number }>()
);
export const addToFavoriteMoviesSuccess = createAction(
	'[Movies] Add To Favorite Movies Success',
	props<{ movie: Movie }>()
);
export const addToFavoriteMoviesFailure = createAction(
	'[Movies] Add To Favorite Movies Failure',
	props<{ error: string }>()
);
// Removing a movie from favorites
export const removeFromFavoriteMovies = createAction(
	'[Movies] Remove From Favorite Movies',
	props<{ movieId: number }>()
);
export const removeFromFavoriteMoviesSuccess = createAction(
	'[Movies] Remove From Favorite Movies Success',
	props<{ movieId: number }>()
);
export const removeFromFavoriteMoviesFailure = createAction(
	'[Movies] Remove From Favorite Movies Failure',
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
// Adding a movie to the Watch Later list
export const addToWatchLaterMovies = createAction(
	'[Movies] Add To Watch Later Movies',
	props<{ movieId: number }>()
);
export const addToWatchLaterMoviesSuccess = createAction(
	'[Movies] Add To Watch Later Movies Success',
	props<{ movie: Movie }>()
);
export const addToWatchLaterMoviesFailure = createAction(
	'[Movies] Add To Watch Later Movies Failure',
	props<{ error: string }>()
);
// Removing a movie from the Watch Later list
export const removeFromWatchLaterMovies = createAction(
	'[Movies] Remove From Watch Later Movies',
	props<{ movieId: number }>()
);
export const removeFromWatchLaterMoviesSuccess = createAction(
	'[Movies] Remove From Watch Later Movies Success',
	props<{ movieId: number }>()
);
export const removeFromWatchLaterMoviesFailure = createAction(
	'[Movies] Remove From Watch Later Movies Failure',
	props<{ error: string }>()
);

// subscribe Actions
export const subscribe = createAction(
	'[Subscription] Subscribe',
	props<{ subscription: Subscription }>()
);
export const unsubscribe = createAction('[Subscription] Unsubscribe');
