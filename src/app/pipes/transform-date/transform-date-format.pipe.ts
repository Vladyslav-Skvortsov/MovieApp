import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'transformDateFormat',
	standalone: true,
})
export class TransformDateFormatPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) return '';
		const parts = value.split('-');
		return `${parts[2]}-${parts[1]}-${parts[0]}`;
	}
}
