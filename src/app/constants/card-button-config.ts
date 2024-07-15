import { ButtonConfig } from '@interfaces/button';
import { ButtonConfigSeverity } from '@enums/button-config-severity.enum';

export const buttonFavoritesConfig: ButtonConfig = {
	icon: 'pi pi-heart',
	label: 'Favorite',
	severity: undefined,
	class: 'movie-card__button-card favorite',
};
export const buttonWatchLaterConfig: ButtonConfig = {
	icon: 'pi pi-bookmark',
	label: 'Watch',
	severity: ButtonConfigSeverity.Contrast,
	class: 'movie-card__button-card watch',
};
export const buttonRemoveConfig: ButtonConfig = {
	icon: 'pi pi-trash',
	label: 'Delete',
	severity: ButtonConfigSeverity.Danger,
	class: 'movie-card__button-card remove',
};
export const buttonShowMoreConfig: ButtonConfig = {
	icon: 'pi pi-eye',
	label: 'Show more...',
	severity: ButtonConfigSeverity.Contrast,
	class: 'movie-card__button-card show-more',
};
