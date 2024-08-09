import {
	ApplicationConfig,
	importProvidersFrom,
	isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MovieEffects } from '@store/effects';
import { movieReducer } from '@store/reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom(
			BrowserAnimationsModule,
			DynamicDialogModule,
			ToastModule
		),
		MessageService,
		DialogService,
		provideRouter(routes),
		provideHttpClient(),
		provideStore({ movie: movieReducer }),
		provideEffects([MovieEffects]),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
	],
};
