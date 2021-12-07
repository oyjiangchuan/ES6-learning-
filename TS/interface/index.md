### 基础
```js
interface A {
  a: string;
  b: number;
}

function fnA(value: A) {
  console.log('value==', value)
}

fnA({ a: 'aa' }) // 会报错 没有传递b属性
fnA({ a: 'aa', b: 'bb'}) // 会报错 b的类型应该是number
```
- 类型检查器不会去检查属性的顺序 只要属性存在并且类型对的就可以

### 可选属性
- 接口里的属性不全都是必需的，有些是只在某些条件下存在，或者根本不存在；可以使用以下的写法
```js
interface B {
  a?: string;
  b?: number;
}

function fnB(value: B) {
  console.log('value==', value)
}

fnB({ a: 'aa' }) // 不会报错
fnB({ b: 1 }) // 不会报错
```

### 只读属性
- 在属性前面添加`readonly`关键字
> `TypeScript`具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

### 添加字符串索引签名
```js
interface C {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```
- 代表`C`可以有任意数量的属性，并且只要它们不是`color`和`width`，那么就无所谓它们的类型是什么

### 函数类型
```js
interface D {
  (source: string, subString: string): boolean;
}
```

### 可索引的类型
- 可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"] 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
```js
interface StringArray {
  [index: number]: string;
}
```