import { ButtonConfigSeverity } from '@enums/button-config-severity.enum';

export interface ButtonConfig {
	icon: string;
	label: string;
	severity: ButtonConfigSeverity | null | undefined;
	class: string;
}
