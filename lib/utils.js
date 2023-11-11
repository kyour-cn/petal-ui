
// 将数组的距离值拆解
export function normalizePadding(arr) {
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

// 简写，待验证
export function normalizePadding2([top = 0, right = top, bottom = top, left = right]) {
	return [top, right, bottom, left];
}