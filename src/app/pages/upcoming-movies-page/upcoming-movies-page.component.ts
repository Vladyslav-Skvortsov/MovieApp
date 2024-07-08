import { Component, OnInit } from '@angular/core';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';
import { MovieService } from '@services/movie.service';

@Component({
	selector: 'app-upcoming-movies-page',
	standalone: true,
	templateUrl: './upcoming-movies-page.component.html',
	styleUrl: './upcoming-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class UpcomingMoviesPageComponent implements OnInit {
	constructor(private movieService: MovieService) {}

	public titlePage: string = 'Upcoming Movies';
	public movies: any[] = [];

	ngOnInit(): void {
		this.movies = this.movieService.getUpcomingMoviesList();
	}
}
