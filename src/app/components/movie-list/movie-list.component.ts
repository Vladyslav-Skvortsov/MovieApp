import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieItemComponent, NgFor],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  @Input() movies: any[] = [];
  @Output() addFavorite = new EventEmitter<any>();
  @Output() addWatch = new EventEmitter<any>();

  addToFavorites(movie: any) {
    this.addFavorite.emit(movie);
  }

  addToWatch(movie: any) {
    this.addWatch.emit(movie);
  }
}
