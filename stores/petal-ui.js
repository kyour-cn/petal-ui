import {defineStore} from 'pinia';

import {defaultTheme, darkTheme} from '../lib/theme'

let isDark = false,
    windowInfo = null,
    systemInfo = null

export const usePetalUiStore = defineStore('petal_ui', {
    state: () => {
        if (windowInfo === null) {
            windowInfo = uni.getWindowInfo()
            systemInfo = uni.getSystemInfoSync()

            // 监听窗口变化
            uni.onWindowResize(() => {
                windowInfo = uni.getWindowInfo()
            })
        }
        return {
            dark: isDark,
            windowInfo,
            systemInfo
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
