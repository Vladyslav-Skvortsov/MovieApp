import { Component, OnInit } from '@angular/core';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { Movie } from '@interfaces/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@services/movie.service';

@Component({
	selector: 'app-movie-detail-page',
	standalone: true,
	imports: [TransformRatingPipe, TransformDateFormatPipe],
	templateUrl: './movie-detail-page.component.html',
	styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
	movie: Movie | undefined;

	public textEmpty: string = 'Loading...';

	constructor(
		private route: ActivatedRoute,
		private movieService: MovieService
	) {}

	ngOnInit(): void {
		const movieId = this.route.snapshot.paramMap.get('id');
		this.loadMovieDetails(movieId);
	}

	loadMovieDetails(id: string | null) {
		if (id) {
			this.movieService.getMovieById(+id).subscribe((movie) => {
				this.movie = movie;
			});
		}
	}
}
