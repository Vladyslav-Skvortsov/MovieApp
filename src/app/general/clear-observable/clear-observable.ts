import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	template: '',
	standalone: true,
})
export abstract class ClearObservableDirective implements OnDestroy {
	constructor() {}

	unsubscribe$: Subject<boolean> = new Subject();

	ngOnDestroy() {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
