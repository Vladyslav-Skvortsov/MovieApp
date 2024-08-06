import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TransformRatingPipe } from '@pipes/transform-rating/transform-rating.pipe';
import { TransformDateFormatPipe } from '@pipes/transform-date/transform-date-format.pipe';
import { Movie } from '@interfaces/movie';
import { BASE_IMG_URL } from '@constants/constant-api';
import { ClearObservableDirective } from '@general/clear-observable/clear-observable';
import { Store } from '@ngrx/store';
import { selectMovieDetail } from '@store/selectors';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-movie-detail-page',
	standalone: true,
	imports: [TransformRatingPipe, TransformDateFormatPipe, CommonModule],
	templateUrl: './movie-detail-page.component.html',
	styleUrl: './movie-detail-page.component.scss',
})
// ! TODO fix readability
export class MovieDetailPageComponent
	extends ClearObservableDirective
	implements OnInit
{
	public movie$: Observable<Movie | null>;
	public textEmpty: string = 'Loading...';
	public imagePath: string | undefined;

	constructor(private route: ActivatedRoute, private store: Store) {
		super();
		this.movie$ = this.store.select(selectMovieDetail);
	}

	ngOnInit(): void {
		this.movie$.pipe(takeUntil(this.unsubscribe$)).subscribe((movie) => {
			if (movie) {
				this.imagePath = `${BASE_IMG_URL}${movie.poster_path}`;
			}
		});
	}
}
