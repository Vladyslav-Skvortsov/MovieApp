import { Component } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MoviesPageComponent } from '../../components/movies-page/movies-page.component';

@Component({
	selector: 'app-favorite-movies-page',
	standalone: true,
	templateUrl: './favorite-movies-page.component.html',
	styleUrl: './favorite-movies-page.component.scss',
	imports: [MovieListComponent, MoviesPageComponent],
})
export class FavoriteMoviesPageComponent {
	public titlePage: string = 'Favorite Movies';
	public titleEmptyPage: string = 'Favorite Movies Is Empty';

	public isFavoriteMovies: boolean = false;

	public favoriteMovies: any[] = [];
}
