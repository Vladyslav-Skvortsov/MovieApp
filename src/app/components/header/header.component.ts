import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterModule, MenubarModule, NgIf, CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	items: MenuItem[] | undefined;

	ngOnInit() {
		this.items = [
			{
				label: 'Favourite',
				route: 'favorite-movies',
				icon: 'pi pi-heart',
			},
			{
				label: 'Watch List',
				route: 'watch-later',
				icon: 'pi pi-bookmark',
			},
		];
	}
}
