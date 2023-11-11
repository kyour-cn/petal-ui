
// 将数组的距离值拆解
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
 * 将rpx转换为px
 * @param px
 * @param screenWidth 屏幕的宽度，默认自动获取
 * @return number
 */
export function px2Rpx(px, screenWidth) {
	if (typeof screenWidth === 'undefined' || !screenWidth) {
		screenWidth = uni.getSystemInfoSync().screenWidth;
	}
	let pixelRatio = 750 / screenWidth;
	return Math.ceil(px * pixelRatio)
}