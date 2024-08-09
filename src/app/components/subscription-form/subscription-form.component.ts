import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as MovieActions from '@store/actions';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
	selector: 'app-subscription-form',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		MessageModule,
		CalendarModule,
		MultiSelectModule,
		CheckboxModule,
	],
	templateUrl: './subscription-form.component.html',
	styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent {
	subscriptionForm: FormGroup;
	genres = [
		{ label: 'Action', value: 'action' },
		{ label: 'Drama', value: 'drama' },
		{ label: 'Comedy', value: 'comedy' },
		{ label: 'Horror', value: 'horror' },
	];

	constructor(private fb: FormBuilder, private store: Store) {
		this.subscriptionForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			birthdate: [null],
			genres: [[]],
			agree: [false, Validators.requiredTrue],
		});
	}

	onSubmit() {
		if (this.subscriptionForm.valid) {
			this.store.dispatch(
				MovieActions.subscribe({
					subscription: this.subscriptionForm.value,
				})
			);
		}
	}

	onUnsubscribe() {
		this.store.dispatch(MovieActions.unsubscribe());
	}
}
