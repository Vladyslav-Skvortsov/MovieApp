import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class ClearObservableDirective implements OnDestroy {
	unsubscribe$: Subject<boolean> = new Subject();

	ngOnDestroy() {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
