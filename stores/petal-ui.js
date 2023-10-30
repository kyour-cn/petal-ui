import {defineStore} from 'pinia';

let isDark = false;

let defaultTheme = {
	'primary': '#007DFF',
	'success': '#2ECC71',
}

export const usePetalUiStore = defineStore('petal_ui', {
	state: () => {
		return {
			dark: isDark,
			theme: defaultTheme

		}
	},
	actions: {
		// setTheme(value) {
		// 	for(let i in value) {
		// 		this.theme[i] = value[i];
		// 	}
		// },
	},
});
