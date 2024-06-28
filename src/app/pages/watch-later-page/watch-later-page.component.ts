import { Component } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';

@Component({
	selector: 'app-watch-later-page',
	standalone: true,
	templateUrl: './watch-later-page.component.html',
	styleUrl: './watch-later-page.component.scss',
	imports: [MovieListComponent],
})
export class WatchLaterPageComponent {
	public titlePage: string = 'Watch Later';
	public titleEmptyPage: string = 'Watch Later Is Empty';

	public watchMovies: any[] = [];
}
