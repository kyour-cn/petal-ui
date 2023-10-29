import { defineStore } from 'pinia';

export const usePetalUiStore = defineStore('petal_ui', {

	state: () => {
		let theme = {
			isDark: false

		}

		// 从缓存中加载上一次的配置

		return theme;
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		setTheme(value) {
			for(let i in value) {
				this.theme[i] = value[i];
			}
		},
	},
});
