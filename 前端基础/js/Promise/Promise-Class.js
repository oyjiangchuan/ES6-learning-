// Promise
class MyPromise {
  // 构造方法
  constructor(executor) {
    // 初始化值
    this.initValue();
    // 初始化this指向
    this.initBind();
    // 执行传进来的函数
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      // 兼容throw的情况
      this.reject(e);
    }
  }

  initValue() {
    this.PromiseState = "pending";
    this.PromiseResult = null;
    this.onFulfilledCallbacks = []; // 保存成功回调
    this.onRejectedCallbacks = []; // 保存失败回调
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = value;
    // 执行保存的成功回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }

  reject(reason) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = reason;
    // 执行保存的失败回调
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    // then 返回Promise 保证链式调用
    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          const x = cb(this.PromiseResult);
          if (x === thenPromise) {
            // 不能返回自身哦
            throw new Error("不能返回自身。。。");
          }
          if (x instanceof MyPromise) {
            // 如果返回值是Promise
            // 如果返回值是promise对象，返回值为成功，新promise就是成功
            // 如果返回值是promise对象，返回值为失败，新promise就是失败
            // 谁知道返回的promise是失败成功？只有then知道
            x.then(resolve, reject);
          } else {
            // 非Promise就直接成功
            resolve(x);
          }
        } catch (err) {
          // 处理报错
          reject(err);
          throw new Error(err);
        }
      };
      if (this.PromiseState === "fulfilled") {
        // 如果当前为成功状态，执行第一个回调
        resolvePromise(onFulfilled);
      } else if (this.PromiseState === "rejected") {
        // 如果当前为失败状态，执行第二个回调
        resolvePromise(onRejected);
      } else if (this.PromiseState === "pending") {
        // 如果状态为待定状态，暂时保存两个回调
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
      }
    });

    // 返回这个包装的Promise
    return thenPromise;
  }

  static all() {

  }

  static race() {

  }

  static allSettled() {

  }

  static any() {

  }
}

// 测试
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

// console.log("p==", p);

p.then((res) => 2 * res).then((res) => console.log(res));
