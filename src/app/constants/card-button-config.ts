import { ButtonConfig, ButtonIconConfig } from '@interfaces/button';
import { ButtonConfigSeverity } from '@enums/button-config-severity.enum';

export const buttonIconConfig: ButtonIconConfig = {
	FavoritesFill: 'pi pi-heart-fill',
	FavoritesEmpty: 'pi pi-heart',
	WatchLaterFill: 'pi pi-bookmark-fill',
	WatchLaterEmpty: 'pi pi-bookmark',
	Remove: 'pi pi-trash',
	ShowMore: 'pi pi-eye',
};
export const buttonFavoritesConfig: ButtonConfig = {
	label: 'Favorite',
	severity: undefined,
	class: 'movie-card__button-card favorite',
};
export const buttonWatchLaterConfig: ButtonConfig = {
	label: 'Watch',
	severity: ButtonConfigSeverity.Contrast,
	class: 'movie-card__button-card watch',
};
export const buttonRemoveConfig: ButtonConfig = {
	label: 'Delete',
	severity: ButtonConfigSeverity.Danger,
	class: 'movie-card__button-card remove',
};
export const buttonShowMoreConfig: ButtonConfig = {
	label: 'Show more...',
	severity: ButtonConfigSeverity.Contrast,
	class: 'movie-card__button-card show-more',
};
