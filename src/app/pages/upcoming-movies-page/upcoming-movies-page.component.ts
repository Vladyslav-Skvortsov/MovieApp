import { Component } from '@angular/core';
import { upcomingMovies } from '@assets/database/mock-data';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';

@Component({
	selector: 'app-upcoming-movies-page',
	standalone: true,
	templateUrl: './upcoming-movies-page.component.html',
	styleUrl: './upcoming-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class UpcomingMoviesPageComponent {
	public titlePage: string = 'Upcoming Movies';
	movies = upcomingMovies;
}
