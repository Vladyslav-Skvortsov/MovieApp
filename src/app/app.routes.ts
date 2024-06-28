import { Routes } from '@angular/router';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { TopRateMoviesPageComponent } from './pages/top-rate-movies-page/top-rate-movies-page.component';
import { NowPlayingMoviesPageComponent } from './pages/now-playing-movies-page/now-playing-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';
import { FavoriteMoviesPageComponent } from './pages/favorite-movies-page/favorite-movies-page.component';
import { WatchLaterPageComponent } from './pages/watch-later-page/watch-later-page.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'popular', pathMatch: 'full' },
	{
		path: 'popular',
		component: PopularMoviesPageComponent,
		children: [
			{
				path: 'favorite-movies',
				component: FavoriteMoviesPageComponent,
				outlet: 'header',
			},
			{
				path: 'watch-later',
				component: WatchLaterPageComponent,
				outlet: 'header',
			},
		],
	},
	{
		path: 'top-rate',
		component: TopRateMoviesPageComponent,
	},
	{
		path: 'now-playing',
		component: NowPlayingMoviesPageComponent,
	},
	{
		path: 'upcoming',
		component: UpcomingMoviesPageComponent,
	},
	{
		path: 'movie/:id',
		component: MovieDetailComponent,
	},
];

export class AppRoutingModule {}
