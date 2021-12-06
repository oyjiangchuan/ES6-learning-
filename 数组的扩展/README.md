1. 扩展运算符
  - 三个点`...`，相当于`rest`参数的逆运算，将一个数组转为用逗号分隔的参数序列

  - 后面可以放置表达示 `...( a > 0 ? [1, 4] : [2, 3])`

  - 可以代替`apply`f方法
  ```js
  // ES5写法
  function f(a, b, c, d) {}
  var args = [1, 2, 3, 4]
  f.apply(null, args)
  // ES6写法
  let args = [0, 1, 2]
  f(...args)
  ```

  - 可以复制数组
  ```js
  const a1 = [1, 2]
  // 写法一
  const a2 = [...a1]
  // 写法二
  const [...a2] = a1
  ```

  - 可以合并数组
  ```js
  // ES5 的合并数组
  arr1.concat(arr2, arr3)
  // ES6 的合并数组
  [...arr1, ...arr2, ...arr3]
  // 两种方法都是浅拷贝 它们的成员都是对原数组成员的引用 如果修改了引用指向的值，会同步反映到新数组
  const a1 = [{ foo: 1 }]
  const a2 = [{ bar: 2 }]
  const a3 = a1.concat(a2)
  const a4 = [...a1, ...a2]
  a3[0] === a1[0] // true
  a4[0] === a1[0] // true
  ```

  - 和解构赋值结合
  ```js
  const [first, ...rest] = [1, 2, 3, 4, 5]
  first // 1
  rest  // [2, 3, 4, 5]

  const [first, ...rest] = []
  first // undefined
  rest  // []

  const [first, ...rest] = ['foo']
  first  // 'foo'
  rest   // []
  // ...rest参数只能放到最后一位
  ```

  - 可以将字符串转为数组 正确识别四个字节的`Unicode`字符
  ```js
  [...'abcde'] === 'abcde'.split('') // ['a', 'b', 'c', 'd', 'e']
  ```

  - 任何定义了遍历器`（Iterator）`接口的对象，都可以用扩展运算符转为真正的数组

2. `Array.from()`
  - 将两类对象转为真正的数组：类似数组的对象`（array-like object）`和可遍历`（iterable）`的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）
  - 扩展运算符背后调用的是遍历器接口`（Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换。`Array.from`方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有`length`属性。因此，任何有`length`属性的对象，都可以通过`Array.from`方法转为数组，而此时扩展运算符就无法转换
  ```js
  Array.from({ length: 3 })
  // [ undefined, undefined, undefined ]

  let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
  }
  // ES5的写法
  var arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']
  // ES6的写法
  let arr2 = Array.from(arrayLike) // ['a', 'b', 'c']
  ```

  - 第二个参数fn，类似`map`操作
  ```js
  Array.from(arrayLike, x => x * x)
  // 等同于
  Array.from(arrayLike).map(x => x * x)
  ```

3. `Array.of()`

4. 实例方法：`copyWithin()`

5. 实例方法：`find()` 和 `findIndex()`

6. 实例方法：`fill()`

7. 实例方法：`entries()`，`keys()` 和 `values()`

8. 实例方法：`includes()`

9. 实例方法：`flat()`，`flatMap()`
  - `flat()`为数组扁平化的方法，默认只会扁平化一层数组结构；接受一个整数参数，代表扁平化的层数，`Infinity`(代表正无穷大)参数代表不管嵌套多深，都扁平化为一层

  ```js
  [1, 2, [3, 4]].flat() // [1, 2, 3, 4]
  [1, 2, [3, [4]]].flat(2) // [1, 2, 3, 4]
  [1, 2, [3, [4, [5]]]].flat(Infinity) // [1, 2, 3, 4, 5]
  ```

  - `flatMap`类似数组的`map`方法，返回一个新的数组，并且对返回的数组执行`flat()`方法；`flatMap`方法只能展开一层数组

  ```js
  [1, 2, 3, 4].flatMap(item => [item, item * 2]) // [1, 2, 2, 4, 3, 6, 4, 8]
  // 相当于执行了[1, 2, 3, 4].map(item => [item, item * 2]).flat()
  ```

10. 实例方法：`at()`

11. 数组的空位

12. `Array.prototype.sort()` 的排序稳定性