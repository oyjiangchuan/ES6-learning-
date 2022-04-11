// 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组 求所有子数组的和的最大值
// 要求时间复杂度为O(n)

// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6
// 分治 动态规划

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	// 当前元素值cur
	// 前元素之前的累加值pre
	// 累加值和sum
	let pre = (cur = sum = nums[0])
	for (let i = 1; i < nums.length; i++) {
		cur = pre >= 0 ? pre + nums[i] : nums[i]
		pre = cur
		sum = Math.max(sum, pre)
	}
	return sum
}
