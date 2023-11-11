import {defineStore} from 'pinia';

import {defaultTheme, darkTheme} from '../lib/theme'

let isDark = false;

let windowInfo = null,
	systemInfo = null;

export const usePetalUiStore = defineStore('petal_ui', {
	state: () => {
		if (windowInfo === null) {
			windowInfo = uni.getWindowInfo()
			systemInfo = uni.getSystemInfoSync()
		}
		return {
			dark: isDark,

			windowInfo,
			systemInfo,

			screenWidth: windowInfo.screenWidth,
			screenHeight: windowInfo.screenHeight,
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
