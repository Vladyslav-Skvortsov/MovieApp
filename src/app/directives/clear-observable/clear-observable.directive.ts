import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
	selector: '[appClearObservable]',
	standalone: true,
})
export class ClearObservableDirective implements OnDestroy {
	constructor() {}

	unsubscribe$: Subject<boolean> = new Subject();

	ngOnDestroy() {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
