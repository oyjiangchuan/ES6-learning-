// 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中
// 调用 min、push 及 pop 的时间复杂度都是 O(1)

/**
 * initialize your data structure here.
 */
var MinStack = function () {
	this.stack = [] // -2 0
	this.minStack = [] // -2
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
	this.stack.push(x)
	if (this.minStack.length == 0 || this.minStack[this.minStack.length - 1] >= x) {
		this.minStack.push(x)
	}
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
	const popItem = this.stack.pop()
	if (popItem === this.minStack[this.minStack.length - 1]) {
		this.minStack.pop()
	}
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
	return this.stack[this.stack.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
	return this.minStack[this.minStack.length - 1]
}
