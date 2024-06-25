import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MovieCardComponent } from '@components/movie-card/movie-card.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { Movie } from '@interfaces/movie';
import { HeaderComponent } from './components/header/header.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		RouterModule,
		MovieListComponent,
		MovieCardComponent,
		SidebarComponent,
		HeaderComponent,
		MovieDetailComponent,
	],
})
export class AppComponent {}
