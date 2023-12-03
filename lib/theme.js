/**
 * 默认主题配色
 */
export const defaultTheme = {

    // 行为相关颜色
    'primary': '#0A59F7',
    'success': '#2ECC71',
    'warning': '#F0AD4E',
    'error': '#DD524D',

    // 文字和其他辅助色
    'title': '#181818',
    'subtitle': '#7F7F7F',
    'label': '#B2B2B2',

    // 页面背景
    'bg-page': '#F1F3F5',
    // 页面内容背景
    'bg-body': '#FFFFFF',
    // 导航背景
    'bg-tabbar': '#F1F3F5',

    // 分割线颜色
    'divider': '#CECECE',

    // 组件浅色背景
    'bg-light': '#CCC',

    // 弹出层背景
    'bg-popup': '#FFFFFF',
}

/**
 * 暗黑主题配色
 */
export const darkTheme = {
    ...defaultTheme,

    'primary': '#317AF7',

    'title': '#DCDDDF',

    'bg-page': '#000000',
    'bg-body': '#303030',
    'bg-tabbar': '#262626',

    'divider': '#4C4D4F',

    'bg-popup': '#1C1D1F',
}
