import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MovieCardComponent } from '@components/movie-card/movie-card.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		MovieListComponent,
		MovieCardComponent,
		SidebarComponent,
	],
})
export class AppComponent {
	constructor(private route: ActivatedRoute) {}

	public favoriteMovies: any[] = [];
	public watchMovies: any[] = [];

	addFavorite(movie: any) {
		const isMovieInFavorite = this.favoriteMovies.some(
			(favoriteMovie) => favoriteMovie.id === movie.id
		);
		if (!isMovieInFavorite) {
			this.favoriteMovies.push(movie);
		}
	}

	addWatch(movie: any) {
		const isMovieInWatch = this.watchMovies.some(
			(watchMovie) => watchMovie.id === movie.id
		);
		if (!isMovieInWatch) {
			this.watchMovies.push(movie);
		}
	}
}
