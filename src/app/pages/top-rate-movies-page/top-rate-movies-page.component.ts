import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie.service';

@Component({
	selector: 'app-top-rate-movies-page',
	standalone: true,
	templateUrl: './top-rate-movies-page.component.html',
	styleUrl: './top-rate-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class TopRateMoviesPageComponent implements OnInit {
	constructor(private movieService: MovieService) {}

	public titlePage: string = 'Top Rate Movies';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movies = this.movieService.getTopRatedMoviesList();
	}
}
