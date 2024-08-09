import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth-service/auth.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		CardModule,
		MessageModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	loginForm: FormGroup;
	errorMessage: string | null = null;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			const { username, password } = this.loginForm.value;
			this.authService.authenticate(username, password).subscribe({
				next: () => {
					this.router.navigate(['/home']);
				},
				error: (error) => {
					this.errorMessage =
						'Authentication error. Please check your credentials.';
				},
			});
		}
	}
}
