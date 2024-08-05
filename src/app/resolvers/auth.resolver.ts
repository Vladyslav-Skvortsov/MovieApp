import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAccountId, selectSessionId } from '@store/selectors';
import * as MovieActions from '@store/actions';

export const authResolver: ResolveFn<boolean> = (route, state) => {
	const store = inject(Store);

	return store.select(selectAccountId).pipe(
		switchMap((accountId) => {
			if (!accountId) {
				store.dispatch(MovieActions.loadAccountInfo());
			}
			return store.select(selectSessionId).pipe(
				switchMap((sessionId) => {
					if (!sessionId) {
						store.dispatch(MovieActions.loadSessionInfo());
					}
					return store.select(selectAccountId).pipe(
						switchMap((accountId) =>
							store.select(selectSessionId).pipe(
								take(1),
								map((sessionId) => !!accountId && !!sessionId)
							)
						)
					);
				}),
				take(1)
			);
		}),
		take(1)
	);
};
