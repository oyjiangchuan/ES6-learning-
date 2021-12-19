### scoped原理

在`vue`中我们写样式经常会使用到`scoped`来保证当前的样式只是在当前组件的作用域内生效；经过观察可以发现，在`style`标签中添加了`scoped`属性的样式，经过`vue-loader`处理过后就会在该组件内部的`template`中的每个`dom`添加上(一个或者多个)类似`data-v-xxxxxxxx`的属性；同时加上了`scoped`属性的样式会被编译成如下：

```scss
/* 编译前 */
.test {
  display: block;
  .inner-test {
    display: inline-block;
  }
}

/* 编译后 */
.test[data-v-xxxxxxxx] {
  display: block;
}
.test .inner-test[data-v-xxxxxxxx] {
  display: inline-block;
}
```

从以上来看，我们可以发现 其实作用域内的`css`是靠`css`的属性选择器实现的：给所有`scoped`内的`dom`添加`data-v-xxxxxxxx`属性 => 把`css`编译成为带属性选择器的`css`

> 注意：使用`scoped`之后，父组件样式不会渗透到子组件中；不过一个子组件的根结点会同时受到父组件的`scoped` `css`和子组件的 `scoped` `css`影响。这样设计是为了让父组件从布局的角度可以调整子组件的根元素样式

### ::v-deep /deep/ >>>详解

当我们需要修改三方组件库的样式时 如果我们在组件内使用了scoped 我们直接修改是不会生效的 比如我需要修改vant的系统样式 

```scss
/* 编译前 */
.vant__button {
  ...
}

/* 编译后 */
.vant__button[data-v-xxxxxxxx] {
  ...
}
```
这样是没办法匹配到的

这时候我们可以使用`::v-deep /deep/ >>> `深度作用选择器 

```scss
/* 编译前 */
::v-deep .vant__button {
  ...
}

/* 编译后 */
[data-v-xxxxxxxx] .vant__button {
  ...
}
```
这样就能正常匹配到了，我们可以发现添加了`::v-deep /deep/ >>> ` 深度作用选择器 之后，在样式中添加的属性选择器会被提前 换一个说法 可以理解是添加了 `::v-deep /deep/ >>> `标签的样式不会只在该组件内匹配 可以匹配到同名的全局样式

> 其他需要注意的现象：
1. 通过 `v-html` 创建的 `DOM` 内容不受 `scoped` 样式影响(DOM不会被加上样式属性)，但是你仍然可以通过深度作用选择器来为他们设置样式
2. `Scoped` 样式不能代替 `class`。考虑到浏览器渲染各种 `CSS` 选择器的方式，当 `p { color: red } `是 `scoped` 时 (即与特性选择器组合使用时) 会慢很多倍。如果你使用 `class` 或者 `id` 取而代之，比如 `.example { color: red }`，性能影响就会消除（就是在使用scoped时不推荐使用标签选择器来写样式 性能会比较差）
3. 在递归组件中小心使用后代选择器! 对选择器 `.a .b `中的 `CSS` 规则来说，如果匹配` .a `的元素包含一个递归子组件，则所有的子组件中的` .b `都将被这个规则匹配
4. 会出现使用::v-deep 修改类似el-dialog组件的样式不生效 那是因为el-dialog组件之类的组件会挂载在body上 而不是属于该组件内部 所以 类似 `[data-v-xxxxxxxx] .el__dialog {}` 这种样式没办法匹配到；解决方法是可以添加新类名 

### transition标签影响 slot中的样式
上面我们说到了 使用`scoped`之后，父组件样式不会渗透到子组件中；一个子组件的根结点会同时受到父组件的`scoped` `css`和子组件的 `scoped` `css`影响；即一个子组件的根节点会同时加上父组件和子组件的`data-v-xxxxxxxx`属性
在实际开发中发现: 父子组件都使用`scoped` 使用了`slot`插槽的子组件 如果不加`transition`标签包裹 从父组件中传入的插槽节点 也会同时加上父组件和子组件的`data-v-xxxxxxxx` 
但是 加了`transition`标签之后 该插槽节点只会添加上父组件的`data-v-xxxxxxxx` 属性

如下：

```html
<!-- 子组件定义 -->
...
<div class="pop-footer">
	<slot name="footer">
		<button @click="confirm">取消</button>
		<button @click="confirm2">确认</button>
	</slot>
</div>
...

<!-- 父组件使用 -->
...
	<template v-slot:footer>
		<button class="single" @click="showAddPop">提交</button>
	</template>
...

<!-- 两个组件样式都是scoped -->
<!-- 没有添加transition之前，编译为：<button v-data-父组件 v-data-子组件 class="single" @click="showAddPop">提交</button> -->
<!-- 添加transition之后，编译为：<button v-data-父组件 class="single" @click="showAddPop">提交</button> -->
```
原因暂时不清楚，transition标签可能影响了层级或者其他之类

解决方案：在子组件中编写slot的样式 如果想要在父组件中正常作用 可以使用`::v-deep /deep/ >>> `深度作用选择器 进行编写