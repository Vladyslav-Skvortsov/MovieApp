import { CanActivateFn } from '@angular/router';

export const movieGuard: CanActivateFn = (route, state) => {
	return true;
};
