import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-login-popup',
	standalone: true,
	imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule],
	templateUrl: './login-popup.component.html',
	styleUrl: './login-popup.component.scss',
	providers: [DialogService],
})
export class LoginPopupComponent {
	visible: boolean = true;

	closeDialog(): void {
		this.visible = false;
	}
}
