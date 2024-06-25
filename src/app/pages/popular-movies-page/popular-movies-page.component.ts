import { Component, EventEmitter, Input, Output } from '@angular/core';
import { popularMovies } from '@assets/database/mock-data';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { RouterModule } from '@angular/router';
import { Movie } from '@interfaces/movie';

@Component({
	selector: 'app-popular-movies-page',
	standalone: true,
	templateUrl: './popular-movies-page.component.html',
	styleUrl: './popular-movies-page.component.scss',
	imports: [MovieListComponent, RouterModule],
})
export class PopularMoviesPageComponent {
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	public titlePage: string = 'Popular Movies';

	movies = popularMovies;

	addToFavorites(movie: Movie) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: Movie) {
		this.addWatch.emit(movie);
	}
}
