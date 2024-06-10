import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() movie: any;
  @Output() addFavorite = new EventEmitter<any>();
  @Output() addWatch = new EventEmitter<any>();

  addToFavorites() {
    this.addFavorite.emit(this.movie);
  }

  addToWatch() {
    this.addWatch.emit(this.movie);
  }
}
