import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAccountId, selectSessionId } from '@store/selectors';
import * as MovieActions from '@store/actions';

export const authResolver: ResolveFn<boolean> = (route, state) => {
	return true;
};
