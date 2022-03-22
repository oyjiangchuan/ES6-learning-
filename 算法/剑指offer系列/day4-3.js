// 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内
// 在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字
// 输入: [0,1,3]
// 输出: 2

// 输入: [0,1,2,3,4,5,6,7,9]
// 输出: 8

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
	let len = nums.length
	for (let i = 0; i < len; i++) {
		if (nums[i] !== i) return i
	}
	return len
}

// return break continue 跳出循环

// 对于有序的数组, 都应该想到用二分法搜索
// 二分查找解法
