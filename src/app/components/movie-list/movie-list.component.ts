import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieCardComponent } from '@components/movie-card/movie-card.component';

@Component({
	selector: 'app-movie-list',
	standalone: true,
	imports: [MovieCardComponent],
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
	@Input() movies: any[] = [];
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	trackById(index: number, item: any) {
		return item.id;
	}

	addToFavorites(movie: any) {
		this.addFavorite.emit(movie);
	}

	addToWatch(movie: any) {
		this.addWatch.emit(movie);
	}
}
