import { Component } from '@angular/core';
import { nowPlayingMovies } from '@assets/database/mock-data';
import { MoviesPageComponent } from '@components/movies-page/movies-page.component';

@Component({
	selector: 'app-now-playing-movies-page',
	standalone: true,
	templateUrl: './now-playing-movies-page.component.html',
	styleUrl: './now-playing-movies-page.component.scss',
	imports: [MoviesPageComponent],
})
export class NowPlayingMoviesPageComponent {
	public titlePage: string = 'Now Playing Movies';
	movies = nowPlayingMovies;
}
