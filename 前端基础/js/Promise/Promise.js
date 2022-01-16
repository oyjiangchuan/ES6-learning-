// 手写Promise
function MyPromise(executor) {
  // 状态描述 pending resolved rejected
  this.state = 'pending'
  // 成果结果
  this.value = undefined
  // 失败结果
  this.reason = undefined
  // 保存成功回调
  this.onResolvedCallbacks = []
  // 保存失败回调
  this.onRejectedCallbacks = []

  // resolve方法
  this.resolve = (value) => {
    if (this.state === 'pending') {
      this.value = value
      this.onResolvedCallbacks.forEach(cb => cb(value)) // 如果有成功回调 全部执行
      this.state = 'resolved'
    }
  }
  // reject方法
  this.reject = (reason) => {
    if (this.state === 'pending') {
      this.reason = reason
      this.onRejectedCallbacks.forEach(cb => cb(reason)) // 如果有失败回调 全部执行
      this.state = 'rejected'
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
  if (this.state === 'pending') {
    typeof onFulfilled == 'function' && this.onResolvedCallbacks.push(onFulfilled)
    typeof onRejected == 'function' && this.onRejectedCallbacks.push(onRejected)
  }

  if (this.state === 'resolved') {
    typeof onFulfilled == 'function' && onFulfilled(this.value)
  }
  if (this.state === 'rejected') {
    typeof onRejected == 'function' && onRejected(this.reason)
  }
}


// 测试
let p = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  resolve(1)
  // }, 1000);
})

p.then((data) => console.log(data)) // 1