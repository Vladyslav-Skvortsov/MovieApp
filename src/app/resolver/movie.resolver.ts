import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class MovieResolver implements Resolve<any> {
	constructor(private http: HttpClient) {}

	resolve(route: ActivatedRouteSnapshot): any {
		const id = route.paramMap.get('id');

		return this.http.get<any>(`/api/movie/${id}`);
	}
}
