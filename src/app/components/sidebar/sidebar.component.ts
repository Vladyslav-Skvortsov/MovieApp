import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	public titledSidebar = {
		titledHome: 'Home',
		titledPopular: 'Popular',
		titledTopRate: 'Top Rate',
		titledNowPlaying: 'Now Playing',
		titledUpcoming: 'Upcoming',
	};

	public iconClasses = {
		home: 'pi pi-home',
		popular: 'pi pi-trophy',
		topRate: 'pi pi-star',
		nowPlaying: 'pi pi-forward',
		upcoming: 'pi pi-hourglass',
	};
}
