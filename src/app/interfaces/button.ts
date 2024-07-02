export interface ButtonConfig {
	icon: string;
	label: string;
	severity:
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'help'
		| 'primary'
		| 'secondary'
		| 'contrast'
		| null
		| undefined;
	class: string;
}
