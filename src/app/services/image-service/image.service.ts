import { Injectable } from '@angular/core';
import { BASE_IMG_URL } from '@constant/constantAPI';

@Injectable({
	providedIn: 'root',
})
export class ImageService {
	getFullImagePath(path: string): string {
		return `${BASE_IMG_URL}${path}`;
	}
}
