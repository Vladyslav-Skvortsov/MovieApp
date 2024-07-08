import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie.service';

@Component({
	selector: 'app-popular-movies-page',
	standalone: true,
	templateUrl: './popular-movies-page.component.html',
	styleUrl: './popular-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class PopularMoviesPageComponent implements OnInit {
	constructor(private movieService: MovieService) {}

	public titlePage: string = 'Popular Movies';
	public movies: Movie[] = [];

	ngOnInit(): void {
		this.movies = this.movieService.getPopularMoviesList();
	}
}
