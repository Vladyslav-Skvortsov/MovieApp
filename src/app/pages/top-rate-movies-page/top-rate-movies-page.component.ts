import { Component } from '@angular/core';
import { topRatedMovies } from '@assets/database/mock-data';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';

@Component({
	selector: 'app-top-rate-movies-page',
	standalone: true,
	templateUrl: './top-rate-movies-page.component.html',
	styleUrl: './top-rate-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class TopRateMoviesPageComponent {
	public titlePage: string = 'Top Rate Movies';
	movies = topRatedMovies;
}
