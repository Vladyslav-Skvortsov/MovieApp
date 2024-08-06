import { Movie } from '@interfaces/movie';

export interface MovieStateInterface {
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
