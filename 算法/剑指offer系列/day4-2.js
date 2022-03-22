// 统计一个数字在排序数组中出现的次数
// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2

// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: 0

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	let count = 0
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] == target) count++
		if (nums[i] > target) break
	}
	return count
}

// 二分查找题解
// 输入: nums = [5,7,7,8,8,8,8,8,10], target = 8

var binarySearch = function (nums, target, lower) {
	let left = 0,
		right = nums.length - 1,
		ans = nums.length
	while (left < right) {
		const mid = Math.floor((left + right) / 2) // 向下取整
		if (nums[mid] > target || (lower && nums[mid] >= target)) {
			right = mid - 1
			ans = mid
		} else {
			left = mid + 1
		}
	}
	return ans
}
