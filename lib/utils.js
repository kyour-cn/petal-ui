/**
 * 将数组的距离值拆解
 * @param param 支持数组和数字
 * @returns array
 */
export function normalizePadding(param) {
  let arr = Array.isArray(param) ? param : [param]
  switch (arr.length) {
    case 1:
      return [arr[0], arr[0], arr[0], arr[0]];
    case 2:
      return [arr[0], arr[1], arr[0], arr[1]];
    case 3:
      return [arr[0], arr[1], arr[2], arr[1]];
    default:
    case 4:
      return arr;
  }
}

/**
 * 将数组的距离值拆解，并将单位转换为rpx
 * @param param 支持数组和数字
 * @param unit 单位，默认rpx
 * @return string
 */
export function normalizePaddingString(param, unit = 'rpx') {
  if (typeof param === 'string') return param

  let newArr = []
  normalizePadding(param).forEach((item) => {
    newArr.push(item + unit)
  })
  return newArr.join(' ')
}

/**
 * 将单位px转换为rpx
 * @param px
 * @param screenWidth 屏幕的宽度，默认自动获取
 * @return number
 */
export function px2Rpx(px, screenWidth = undefined) {
  if (typeof screenWidth === 'undefined' || !screenWidth) {
    screenWidth = uni.getSystemInfoSync().screenWidth;
  }
  let pixelRatio = 750 / screenWidth;
  return Math.ceil(px * pixelRatio)
}

/**
 * 设置导航栏颜色
 * @param isDark
 */
export function setStatusBarStyle(isDark) {
  // 支付宝小程序不支持设置导航栏颜色
  // #ifndef MP-ALIPAY
  if (isDark) {
    uni.setNavigationBarColor({
      backgroundColor: '#000000',
      frontColor: '#ffffff'
    }).catch(() => {
    })
  } else {
    uni.setNavigationBarColor({
      backgroundColor: '#ffffff',
      frontColor: '#000000'
    }).catch(() => {
    })
  }
  // #endif

  // #ifdef APP
  if (isDark) {
    plus.navigator.setStatusBarStyle('light')
  } else {
    plus.navigator.setStatusBarStyle('dark')
  }
  // #endif

}

/**
 * 格式化尺寸单位
 * @param value
 */
export function formatSizeUnit(value) {
  if (typeof value === 'number') {
    return value + 'rpx'
  } else {
    return value
  }
}
