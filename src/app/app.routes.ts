import { Routes } from '@angular/router';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { TopRateMoviesPageComponent } from './pages/top-rate-movies-page/top-rate-movies-page.component';
import { NowPlayingMoviesPageComponent } from './pages/now-playing-movies-page/now-playing-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';
import { FavoriteMoviesPageComponent } from './pages/favorite-movies-page/favorite-movies-page.component';
import { WatchLaterPageComponent } from './pages/watch-later-page/watch-later-page.component';
import { MovieDetailPageComponent } from './pages/movie-detail-page/movie-detail-page.component';
import { authResolver } from '@resolvers/auth.resolver';
import { authGuard } from '@guards/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'popular', pathMatch: 'full' },
	{
		path: 'popular',
		component: PopularMoviesPageComponent,
		pathMatch: 'full',
		resolve: {
			auth: authResolver,
		},
		canActivate: [authGuard],
	},
	{
		path: 'top-rate',
		component: TopRateMoviesPageComponent,
		pathMatch: 'full',
		resolve: {
			auth: authResolver,
		},
		canActivate: [authGuard],
	},
	{
		path: 'now-playing',
		component: NowPlayingMoviesPageComponent,
		pathMatch: 'full',
		resolve: {
			auth: authResolver,
		},
		canActivate: [authGuard],
	},
	{
		path: 'upcoming',
		component: UpcomingMoviesPageComponent,
		pathMatch: 'full',
		resolve: {
			auth: authResolver,
		},
		canActivate: [authGuard],
	},
	{
		path: 'favorite',
		component: FavoriteMoviesPageComponent,
		pathMatch: 'full',
		resolve: {
			auth: authResolver,
		},
		canActivate: [authGuard],
	},
	{
		path: 'watch-later',
		component: WatchLaterPageComponent,
		pathMatch: 'full',
		resolve: {
			auth: authResolver,
		},
		canActivate: [authGuard],
	},
	{
		path: 'movie/:id',
		component: MovieDetailPageComponent,
		pathMatch: 'full',
		resolve: {
			auth: authResolver,
		},
		canActivate: [authGuard],
	},
];

export class AppRoutingModule {}
