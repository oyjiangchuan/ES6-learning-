// 手写Promise
function MyPromise(executor) {
	// 状态描述 pending resolved rejected
	this.PromiseState = 'pending'
	// 返回结果
	this.PromiseResult = null
	// 保存成功回调
	this.onResolvedCallbacks = []
	// 保存失败回调
	this.onRejectedCallbacks = []

	// resolve方法
	this.resolve = (value) => {
		if (this.PromiseState === 'pending') {
			this.PromiseResult = value
			this.onResolvedCallbacks.forEach((cb) => cb(value)) // 如果有成功回调 全部执行
			this.PromiseState = 'resolved'
		}
	}
	// reject方法
	this.reject = (reason) => {
		if (this.PromiseState === 'pending') {
			this.PromiseResult = reason
			this.onRejectedCallbacks.forEach((cb) => cb(reason)) // 如果有失败回调 全部执行
			this.PromiseState = 'rejected'
		}
	}

	// 执行方法
	try {
		executor(this.resolve, this.reject)
	} catch (error) {
		this.reject(error)
	}
}

// then方法
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	var thenPromise = new MyPromise((resolve, reject) => {
		const resolvePromise = (cb) => {
			// 实现MyPromise.then是微任务 需要让resolvePromise函数异步执行
			setTimeout(() => {
				try {
					const x = cb(this.PromiseResult)
					if (x === thenPromise) {
						// 不能返回自身哦
						throw new Error('不能返回自身。。。')
					}
					if (x instanceof MyPromise) {
						// 如果返回值是Promise
						// 如果返回值是promise对象，返回值为成功，新promise就是成功
						// 如果返回值是promise对象，返回值为失败，新promise就是失败
						// 谁知道返回的promise是失败成功？只有then知道
						x.then(resolve, reject)
					} else {
						resolve(x)
					}
				} catch (error) {
					reject(error)
					throw new Error(err)
				}
			})
		}

		if (this.PromiseState === 'pending') {
			typeof onFulfilled == 'function' && this.onResolvedCallbacks.push(resolvePromise.bind(this, onFulfilled))
			typeof onRejected == 'function' && this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
		}
		if (this.PromiseState === 'resolved') {
			typeof onFulfilled == 'function' && resolvePromise(onFulfilled)
		}
		if (this.PromiseState === 'rejected') {
			typeof onRejected == 'function' && resolvePromise(onRejected)
		}
	})
	return thenPromise
}

// 测试
let p = new MyPromise((resolve, reject) => {
	// setTimeout(() => {
	resolve(1)
	// }, 1000);
}).then((res) => console.log(res))

console.log(2)
