import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MovieCardComponent } from '@components/movie-card/movie-card.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { Movie } from '@interfaces/movie';
import { HeaderComponent } from './components/header/header.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		RouterModule,
		MovieListComponent,
		MovieCardComponent,
		SidebarComponent,
		HeaderComponent,
		MovieDetailComponent,
	],
})
export class AppComponent {
	constructor(private route: ActivatedRoute) {}

	public favoriteMovies: any[] = [];
	public watchMovies: any[] = [];

	addFavorite(movie: Movie) {
		const isMovieInFavorite = this.favoriteMovies.some(
			(favoriteMovie) => favoriteMovie.id === movie.id
		);
		if (!isMovieInFavorite) {
			this.favoriteMovies.push(movie);
		}
	}

	addWatch(movie: Movie) {
		const isMovieInWatch = this.watchMovies.some(
			(watchMovie) => watchMovie.id === movie.id
		);
		if (!isMovieInWatch) {
			this.watchMovies.push(movie);
		}
	}
}
