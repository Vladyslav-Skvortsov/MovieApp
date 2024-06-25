import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-movie-detail',
	standalone: true,
	imports: [],
	templateUrl: './movie-detail.component.html',
	styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
	// @Input() movie: any;

	movie = {
		id: 1022789,
		original_language: 'en',
		original_title: 'Inside Out 2',
		overview:
			"Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
		popularity: 9750.804,
		poster_path: 'assets/img/mock-img.jpg',
		release_date: '2024-06-11',
		title: 'Inside Out 2',
		vote_average: 7.763,
	};
}
