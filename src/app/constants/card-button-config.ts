import { ButtonConfig } from '@interfaces/button';

export const buttonFavoritesConfig: ButtonConfig = {
	icon: 'pi pi-heart',
	label: 'Favorite',
	severity: undefined,
	class: 'movie-card__button-card favorite',
};
export const buttonWatchLaterConfig: ButtonConfig = {
	icon: 'pi pi-bookmark',
	label: 'Watch',
	severity: 'contrast',
	class: 'movie-card__button-card watch',
};
export const buttonRemoveConfig: ButtonConfig = {
	icon: 'pi pi-trash',
	label: 'Delete',
	severity: 'danger',
	class: 'movie-card__button-card remove',
};
export const buttonShowMoreConfig: ButtonConfig = {
	icon: 'pi pi-eye',
	label: 'Show more...',
	severity: 'contrast',
	class: 'movie-card__button-card show-more',
};
