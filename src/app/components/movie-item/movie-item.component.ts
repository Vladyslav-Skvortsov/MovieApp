import {
	Component,
	EventEmitter,
	Input,
	Output,
	PipeTransform,
} from '@angular/core';

// оголосив Pipe тут тому що не зрозумів як це зробити не додаючи модуль (я не хотів додавати модуль так як не розібрався ще з ними)
export class TransformRatingPipe implements PipeTransform {
	transform(value: number): string {
		return Number.isInteger(value) ? value.toString() : value.toFixed(1);
	}
}

@Component({
	selector: 'app-movie-item',
	standalone: true,
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss'],
	providers: [TransformRatingPipe],
})
export class MovieItemComponent {
	@Input() movie: any;
	@Output() addFavorite = new EventEmitter<any>();
	@Output() addWatch = new EventEmitter<any>();

	constructor(private transformRatingPipe: TransformRatingPipe) {}

	get transformedRating(): string {
		return this.transformRatingPipe.transform(this.movie.rating);
	}

	addToFavorites() {
		this.addFavorite.emit(this.movie);
	}

	addToWatch() {
		this.addWatch.emit(this.movie);
	}
}
