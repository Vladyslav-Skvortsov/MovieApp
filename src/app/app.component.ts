import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieListComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  movies = [
    {
      image: '../assets/img/mock-img.jpg',
      id: 129590,
      overview:
        'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.',
      title: 'Movie 1',
      rating: 8.0,
    },
    {
      image: '../assets/img/mock-img.jpg',
      id: 329590,
      overview:
        'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.',
      title: 'Movie 2',
      rating: 6.5,
    },
    {
      image: '../assets/img/mock-img.jpg',
      id: 529590,
      overview:
        'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.',
      title: 'Movie 3',
      rating: 7.0,
    },
    {
      image: '../assets/img/mock-img.jpg',
      id: 959999,
      overview:
        'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.',
      title: 'Movie 4',
      rating: 5.5,
    },
  ];

  favoriteMovies: any[] = [];
  watchMovies: any[] = [];

  addFavorite(movie: any) {
    if (
      !this.favoriteMovies.some(
        (favoriteMovie) => favoriteMovie.id === movie.id
      )
    ) {
      this.favoriteMovies.push(movie);
    }
  }

  addWatch(movie: any) {
    if (!this.watchMovies.some((watchMovie) => watchMovie.id === movie.id)) {
      this.watchMovies.push(movie);
    }
  }
}
