import { Injectable } from '@angular/core';
import {
	nowPlayingMovies,
	popularMovies,
	topRatedMovies,
	upcomingMovies,
} from '@assets/database/mock-data';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor() {}
}
