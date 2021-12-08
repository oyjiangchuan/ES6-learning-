### Object的部分实用方法

#### 静态方法
- `Object.entries()`: 返回一个给定对象自身可枚举属性的键值对数组`[key, value]` 其排列与使用`for...in`循环遍历该对象时返回的顺序一致（区别在于`for-in`循环还会枚举原型链中的属性）

```js
// 用法
const obj = {
  name: 'tom',
  age: 10
}
console.log(Object.entries(obj)) // [ ['name', 'tom'], ['age', 10] ]
console.log(Object.entries('foo')) // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]
// 可以使用数组的解构
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`)
})
// name: tom
// age: 10

// 可以将object转化为Map
const obj1 = { foo: 'bar', baz: 42 }
const map = new Map(Object.entries(obj))
console.log(map) // Map { foo: "bar", baz: 42 }
```

- `Object.keys()`：返回一个包含所有给定对象`自身可枚举属性`名称的数组
```js
console.log(Object.keys(['a', 'b', 'c'])) // ['0', '1', '2']
console.log(Object.keys({ 0: 'a', 1: 'b', 2: 'c' })) // ['0', '1', '2']
console.log(Object.keys('foo')) // ['0', '1', '2']   
```

- `Object.values()`：返回一个包含所有给定对象`自身可枚举属性`名称的数组
```js
console.log(Object.values({ foo: 'bar', baz: 42 })) // ['bar', 42]
console.log(Object.values({ 0: 'a', 1: 'b', 2: 'c' })) // ['a', 'b', 'c']
console.log(Object.values('foo')) // ['f', 'o', 'o']   
```

- `Object.is()`：

- `Object.assign()`：

- `Object.create()`：

- `Object.defineProperty()`：

- `Object.freeze()`：

#### 实例方法

- `Object.prototype.toString()`：

- `Object.prototype.hasOwnProperty()`：

- `Object.freeze()`：
