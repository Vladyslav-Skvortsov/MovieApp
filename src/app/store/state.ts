import { Movie } from '@interfaces/movie';

export interface MovieState {
	accountId: number | null;
	sessionId: string | null;
	popularMoviesList: Movie[] | null;
	nowPlayingMoviesList: Movie[] | null;
	topRatedMoviesList: Movie[] | null;
	upcomingMoviesList: Movie[] | null;
	favoriteMoviesList: Movie[] | null;
	watchLaterMoviesList: Movie[] | null;
	selectedMovieDetail: Movie | null;
}

export const initialState: MovieState = {
	accountId: null,
	sessionId: null,

	popularMoviesList: null,
	nowPlayingMoviesList: null,
	topRatedMoviesList: null,
	upcomingMoviesList: null,

	favoriteMoviesList: null,
	watchLaterMoviesList: null,

	selectedMovieDetail: null,
};
