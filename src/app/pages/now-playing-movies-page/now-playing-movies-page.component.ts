import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';
import { Movie } from '@interfaces/movie';
import { MovieService } from '@services/movie.service';

@Component({
	selector: 'app-now-playing-movies-page',
	standalone: true,
	templateUrl: './now-playing-movies-page.component.html',
	styleUrl: './now-playing-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class NowPlayingMoviesPageComponent implements OnInit {
	constructor(private movieService: MovieService) {}

	public movies: Movie[] = [];
	public titlePage: string = 'Now Playing Movies';

	ngOnInit(): void {
		this.movies = this.movieService.getPlayingMoviesList();
	}
}
