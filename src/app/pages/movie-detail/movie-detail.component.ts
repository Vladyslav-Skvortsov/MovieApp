import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@interfaces/movie';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import {
	nowPlayingMovies,
	popularMovies,
	topRatedMovies,
	upcomingMovies,
} from '@assets/database/mock-data';

@Component({
	selector: 'app-movie-detail',
	standalone: true,
	templateUrl: './movie-detail.component.html',
	styleUrl: './movie-detail.component.scss',
	imports: [TransformRatingPipe, TransformDateFormatPipe],
})
export class MovieDetailComponent implements OnInit {
	// movie: Movie | undefined;

	allMovies: any | undefined = [
		...nowPlayingMovies,
		...popularMovies,
		...topRatedMovies,
		...upcomingMovies,
	];

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		let allMovies = [
			...nowPlayingMovies,
			...popularMovies,
			...topRatedMovies,
			...upcomingMovies,
		];
		const movieId = this.route.snapshot.paramMap.get('id');
		if (movieId) {
			this.allMovies = allMovies.find((m) => m.id === +movieId);
		}
	}
}
