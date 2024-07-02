import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '@components/movie-card/movie-card.component';
import { Movie } from '@interfaces/movie';

@Component({
	selector: 'app-movie-list',
	standalone: true,
	imports: [MovieCardComponent],
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
	@Input() movies: any[] = [];

	trackById(index: number, item: any) {
		return item.id;
	}
}
