import { Component } from '@angular/core';
import { popularMovies } from '@assets/database/mock-data';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';

@Component({
	selector: 'app-popular-movies-page',
	standalone: true,
	templateUrl: './popular-movies-page.component.html',
	styleUrl: './popular-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class PopularMoviesPageComponent {
	public titlePage: string = 'Popular Movies';
	public movies = popularMovies;
}
