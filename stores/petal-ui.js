import {defineStore} from 'pinia';

let isDark = false;

const windowInfo = uni.getWindowInfo()

let defaultTheme = {

	// 行为相关颜色
	'primary': '#007DFF',
	'success': '#2ECC71',
	'warning': '#F0AD4E',
	'error': '#DD524D',

	// 文字和其他辅助色
	'title': '#181818',
	'label': '#B2B2B2',
	'subtitle': '#7F7F7F',

	'bg-page': '#F3F4F6',
	'bg-body': '#FFFFFF',
	'divider': '#CECECE',
}

let darkTheme = {
	...defaultTheme,

	'title': '#DCDDDF',

	'bg-page': '#000000',
	'bg-body': '#212224',
	'divider': '#4C4D4F',
}

export const usePetalUiStore = defineStore('petal_ui', {
	state: () => {
		return {
			dark: isDark,
			// theme: defaultTheme

			safeAreaInsets: windowInfo.safeAreaInsets,

		}
	},
	actions: {
		setTheme(values, isDark = false) {
			//TODO: 这里设置主题颜色后getters的theme并不会变化
			if (isDark) {
				for (let i in values) {
					darkTheme[i] = values[i];
				}
			} else {
				for (let i in values) {
					defaultTheme[i] = values[i];
				}
			}
		},
	},
	getters: {
		theme: (state) => {
			return state.dark ? darkTheme : defaultTheme;
		}
	}
});
