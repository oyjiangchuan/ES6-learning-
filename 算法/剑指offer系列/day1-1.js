// 用两个栈实现一个队列
// 队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能
// (若队列中没有元素，deleteHead 操作返回 -1 )

// 两个栈，栈A负责进，栈B负责出，这样可以将先进后出变成了先进先出的队列
// 只有在B栈为空的时候，才能把A栈里面的元素全部压入B栈，否则会造成顺序混乱

var CQueue = function () {
	this.stackA = [] // A栈入
	this.stackB = [] // B栈出
}

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
	this.stackA.push(value)
}

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
	if (!this.stackB.length) {
		if (!this.stackA.length) {
			return -1
		} else {
			while (this.stackA.length) {
				this.stackB.push(this.stackA.pop())
			}
		}
	}
	return this.stackB.pop()
}
