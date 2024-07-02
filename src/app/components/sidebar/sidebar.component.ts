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
	public titledSudebar = {
		titledPopular: 'Popular',
		titledTopRate: 'Top Rate',
		titledNowPlaying: 'Now Playing',
		titledUpcoming: 'Upcoming',
		test: 'pi-star',
	};
}
