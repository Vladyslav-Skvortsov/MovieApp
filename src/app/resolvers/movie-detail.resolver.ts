import { inject, Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { MovieStateInterface } from '@interfaces/state-interface';
import { Store } from '@ngrx/store';
import { loadMovieDetail } from '@store/actions';
import { selectMovieDetail } from '@store/selectors';
import { switchMap, of } from 'rxjs';

export const movieDetailResolver: ResolveFn<boolean> = (route) => {
	const store = inject(Store<MovieStateInterface>);
	const movieId = Number(route.paramMap.get('id'));

	if (movieId) {
		store.dispatch(loadMovieDetail({ id: movieId }));

		return store.select(selectMovieDetail).pipe(
			switchMap((movie) => {
				return movie ? of(false) : of(false);
			})
		);
	}
	return of(false);
};
