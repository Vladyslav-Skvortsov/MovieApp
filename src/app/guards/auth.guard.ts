import { inject } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, Observable, of, map, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccountId, selectSessionId } from '@store/selectors';

export const authGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
): Observable<boolean> => {
	const store = inject(Store);
	const router = inject(Router);

	return combineLatest([
		store.select(selectAccountId),
		store.select(selectSessionId),
	]).pipe(
		map(([accountId, sessionId]) => {
			if (accountId && sessionId) {
				return true;
			} else {
				router.navigate(['/home']);
				return false;
			}
		}),
		catchError((error) => {
			console.error('Error fetching accountId or sessionId:', error);
			router.navigate(['/home']);
			return of(false);
		})
	);
};
