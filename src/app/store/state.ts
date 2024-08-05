import { MovieStateInterface } from '@interfaces/state-interface';

export const initialState: MovieStateInterface = {
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
