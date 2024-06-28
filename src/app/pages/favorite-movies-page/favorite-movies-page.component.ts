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
		{
			adult: false,
			backdrop_path: '/hliXekHv7xc2cgXnMBLlp4Eihq8.jpg',
			genre_ids: [53, 27, 28, 9648],
			id: 1001311,
			original_language: 'fr',
			original_title: 'Sous la Seine',
			overview:
				'In the Summer of 2024, Paris is hosting the World Triathlon Championships on the Seine for the first time. Sophia, a brilliant scientist, learns from Mika, a young environmental activist, that a large shark is swimming deep in the river. To avoid a bloodbath at the heart of the city, they have no choice but to join forces with Adil, the Seine river police commander.',
			popularity: 2822.686,
			poster_path: 'assets/img/mock-img.jpg',
			release_date: '2024-06-05',
			title: 'Under Paris',
			video: false,
			vote_average: 5.818,
			vote_count: 535,
		},
		{
			adult: false,
			backdrop_path: '/gRApXuxWmO2forYTuTmcz5RaNUV.jpg',
			genre_ids: [28, 80, 53, 35],
			id: 573435,
			original_language: 'en',
			original_title: 'Bad Boys: Ride or Die',
			overview:
				'After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.',
			popularity: 2744.583,
			poster_path: 'assets/img/mock-img.jpg',
			release_date: '2024-06-05',
			title: 'Bad Boys: Ride or Die',
			video: false,
			vote_average: 7.066,
			vote_count: 305,
		},
	];
}
