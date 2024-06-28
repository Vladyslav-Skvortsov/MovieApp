import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'transformRating',
	standalone: true,
})
export class TransformRatingPipe implements PipeTransform {
	transform(value: number): string {
		if (value % 1 === 0) {
			return value.toFixed(0);
		} else {
			return value.toFixed(1);
		}
	}
}
