import { Component, Input, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '@components/movie-card/movie-card.component';
import { Movie } from '@interfaces/movie';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-movie-list',
	standalone: true,
	imports: [MovieCardComponent, DropdownModule, FormsModule, CommonModule],
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
	@Input() movies: Movie[] = [];

	public sortedMovies: Movie[] = [];
	public sortOptions: { label: string; value: string }[] = [];
	public selectedSortOption: string = '';

	ngOnInit() {
		this.sortOptions = [
			{ label: 'No sorting', value: 'none' },
			{ label: 'Release date', value: 'release_date' },
			{ label: 'Popularity', value: 'popularity' },
			{ label: 'Average rating', value: 'vote_average' },
		];
		this.selectedSortOption = 'none';
		this.sortedMovies = [...this.movies];
	}

	onSortChange() {
		let sortedMovies = [...this.movies];
		if (this.selectedSortOption === 'release_date') {
			sortedMovies.sort(
				(a, b) =>
					new Date(b.release_date).getTime() -
					new Date(a.release_date).getTime()
			);
		} else if (this.selectedSortOption === 'popularity') {
			sortedMovies.sort((a, b) => b.popularity - a.popularity);
		} else if (this.selectedSortOption === 'vote_average') {
			sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
		} else {
			sortedMovies = [...this.movies];
		}
		this.movies = sortedMovies;
	}
}
