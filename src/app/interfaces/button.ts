import { ButtonConfigSeverity } from '@enums/button-config-severity.enum';

export interface ButtonConfig {
	label: string;
	severity: ButtonConfigSeverity | null | undefined;
	class: string;
}
export interface ButtonIconConfig {
	FavoritesFill: string;
	FavoritesEmpty: string;
	WatchLaterFill: string;
	WatchLaterEmpty: string;
	Remove: string;
	ShowMore: string;
}
