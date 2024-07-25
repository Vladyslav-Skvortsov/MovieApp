import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderComponent } from '@components/header/header.component';
import { AuthService } from '@services/auth-service/auth.service';
import { MovieService } from '@services/movie-service/movie.service';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [RouterOutlet, RouterModule, SidebarComponent, HeaderComponent],
	providers: [MovieService, AuthService],
})
export class AppComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private movieService: MovieService
	) {}
	ngOnInit(): void {
		this.authService.authenticateAndGetAccountId().subscribe(
			({ accountId, sessionId }) => {
				this.movieService.setAccountId(accountId);
				this.movieService.setSessionId(sessionId);
				console.log('Account ID:', accountId);
				console.log('Session ID:', sessionId);
			},
			(error) => {
				console.error('Authentication failed:', error);
			}
		);
	}
}
