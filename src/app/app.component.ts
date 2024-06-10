import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
      rating: 8.5,
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
      rating: 7.5,
    },
    {
      image: '../assets/img/mock-img.jpg',
      id: 959999,
      overview:
        'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.',
      title: 'Movie 3',
      rating: 5.5,
    },
  ];

  // favoriteMovies: any[] = [];
  // watcMovies: any[] = [];


}
