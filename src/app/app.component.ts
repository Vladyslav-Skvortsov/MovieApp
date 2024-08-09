import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderComponent } from '@components/header/header.component';
import { AuthService } from '@services/auth-service/auth.service';
import { MovieService } from '@services/movie-service/movie.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import * as MovieActions from '@store/actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		RouterModule,
		SidebarComponent,
		HeaderComponent,
		ToastModule,
		RippleModule,
	],
	providers: [MovieService, AuthService, MessageService],
})
export class AppComponent implements OnInit {
	constructor(
		private actions$: Actions,
		private messageService: MessageService
	) {}
	ngOnInit(): void {
		this.actions$
			.pipe(ofType(MovieActions.showSuccessMessage))
			.subscribe((action) => {
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: action.detail,
				});
			});

		this.actions$
			.pipe(ofType(MovieActions.showErrorMessage))
			.subscribe((action) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: action.detail,
				});
			});
	}
}
