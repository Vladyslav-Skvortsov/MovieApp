import { Component, Input } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { Movie } from '@interfaces/movie';

@Component({
	selector: 'app-movies-page',
	standalone: true,
	imports: [MovieListComponent],
	templateUrl: './movies-page.component.html',
	styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent {
	@Input() titlePage: string = '';
	@Input() movies: Movie[] = [];
	@Input() pageType: string | undefined;
}
