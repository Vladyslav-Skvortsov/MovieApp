import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@services/auth-service/auth.service';
import { selectAccountId } from '@store/selectors';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store
	) {}

	canActivate(): Observable<boolean> {
		return this.store.pipe(
			select(selectAccountId),
			switchMap((accountId) => {
				if (accountId) {
					return of(true);
				} else {
					this.router.navigate(['/login']);
					return of(false);
				}
			}),
			catchError(() => {
				this.router.navigate(['/login']);
				return of(false);
			})
		);
	}
}
