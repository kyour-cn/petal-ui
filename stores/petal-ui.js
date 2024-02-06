import {defineStore} from 'pinia';
import {defaultTheme, darkTheme} from '../lib/theme'
import {setStatusBarStyle} from "../lib/utils";
import {computed, ref} from "vue";

export const usePetalUiStore = defineStore('petal_ui', () => {

    // 是否开启深色模式
    const dark = ref(false)

    let windowInfo = ref(uni.getWindowInfo()),
        systemInfo = ref(uni.getSystemInfoSync())
    // 监听窗口变化
    uni.onWindowResize(() => {
        windowInfo.value = uni.getWindowInfo()
    })

    // 设置是否开启深色模式
    const setDark = (val) => {
        dark.value = Boolean(val);
        setStatusBarStyle(dark.value)
    }

    // 主题颜色
    const theme = computed(() => dark.value ? darkTheme : defaultTheme)

    return {
        dark, theme, windowInfo, systemInfo,
        setDark
    }
})
