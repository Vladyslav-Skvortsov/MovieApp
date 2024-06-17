import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TransformRating',
  standalone: true,
})
export class TransformRatingPipe implements PipeTransform {
  transform(value: number): string {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1);
  }
}
