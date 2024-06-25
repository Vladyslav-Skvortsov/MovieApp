import { Component } from '@angular/core';
import { MovieListComponent } from '@components/movie-list/movie-list.component';

@Component({
	selector: 'app-favorite-movies-page',
	standalone: true,
	imports: [MovieListComponent],
	templateUrl: './favorite-movies-page.component.html',
	styleUrl: './favorite-movies-page.component.scss',
})
export class FavoriteMoviesPageComponent {
	public titlePage: string = 'Favorite Movies';
	public titleEmptyPage: string = 'Favorite Movies Is Empty';

	public favoriteMovies: any[] = [
		{
			adult: false,
			backdrop_path: '/coATv42PoiLqAFKStJiMZs2r6Zb.jpg',
			genre_ids: [16, 10751, 18, 12, 35],
			id: 1022789,
			original_language: 'en',
			original_title: 'Inside Out 2',
			overview:
				"Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
			popularity: 9750.804,
			poster_path: 'assets/img/mock-img.jpg',
			release_date: '2024-06-11',
			title: 'Inside Out 2',
			video: false,
			vote_average: 7.763,
			vote_count: 226,
		},
	];
}
