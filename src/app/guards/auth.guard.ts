import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, switchMap } from 'rxjs/operators';
import { selectAccountId, selectSessionId } from '@store/selectors';
import * as MovieActions from '@store/actions';

export const authGuard: CanActivateFn = (route, state) => {
	const store = inject(Store);

	return store.select(selectAccountId).pipe(
		switchMap((accountId) => {
			if (!accountId) {
				store.dispatch(MovieActions.loadAccountInfo());
			}
			return store
				.select(selectSessionId)
				.pipe(map((sessionId) => !!accountId && !!sessionId));
		}),
		take(1)
	);
};
