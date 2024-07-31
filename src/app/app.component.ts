import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderComponent } from '@components/header/header.component';
import { AuthService } from '@services/auth-service/auth.service';
import { MovieService } from '@services/movie-service/movie.service';
import { select, Store } from '@ngrx/store';
import * as MovieActions from '@store/actions';
import { selectAccountId, selectSessionId } from '@store/selectors';
import { Observable } from 'rxjs';

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
		private store: Store,
		private movieService: MovieService
	) {
		this.accountId$ = this.store.pipe(select(selectAccountId));
		this.sessionId$ = this.store.pipe(select(selectSessionId));
	}

	accountId$: Observable<number | null>;
	sessionId$: Observable<string | null>;

	ngOnInit(): void {
		this.authService.authenticateAndGetAccountId().subscribe(
			({ accountId, sessionId }) => {
				this.store.dispatch(
					MovieActions.setAuthentication({ accountId, sessionId })
				);
				console.log('Account ID:', accountId);
				console.log('Session ID:', sessionId);
			},
			(error) => {
				console.error('Authentication failed:', error);
			}
		);
		this.accountId$.subscribe((accountId) => {
			console.log('Account ID from Store:', accountId);
		});

		this.sessionId$.subscribe((sessionId) => {
			console.log('Session ID from Store:', sessionId);
		});
	}
}
