### 必须属性
- name：以.或_开头，不能有大写字母
- version：项目版本号， x.x.x的格式, 符合语义化版本规则(遵循“大版本.次要版本.小版本”的格式规定)

### 描述信息
- description：项目描述信息，便于`npm`搜索
- keywords：关键词，字符串数组，便于`npm`搜索
- homepage：项目主页地址，一般可填写`git`仓库地址
- bugs：项目问题反馈地址，一般为`git issuse`

### 依赖配置
- dependencies：生产环境中所必须的依赖包
- devDependencies：开发阶段需要的依赖包，如`Webpack、Eslint、Babel`等
- engines：一些旧项目，可能对`npm`包的版本或者`Node`版本有特殊要求，如果不满足条件就可能无法将项目跑起来。为了让项目开箱即用，可以在`engines`字段中说明具体的版本号
```json
"engines": {
	"node": ">=8.10.3 <12.13.0",
  "npm": ">=6.9.0"
}
```
> 注意，`engines`只是起一个说明的作用，即使用户安装的版本不符合要求，也不影响依赖包的安装

### 脚本配置
- scripts：配置命令的集合，`key-value`键值对配置，可以通过`npm run xxx`来运行配置的命令；支持钩子`pre``和post`

```json
"scripts": {
  "dev": "node index.js",
  "predev": "node preIndex.js",
  "postdev": "node postIndex.js",
  "start": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
}
// 执行 npm run dev 命令会如 => predev => dev => postdev
// 通过 -- 配置参数
```
- config：用来配置`scripts`运行时的配置参数

### 文件&目录
* main：指定加载的入口文件，在 `browser` 和 `Node` 环境中都可以使用；如果我们将项目发布为`npm`包，那么当使用 `require` 导入`npm`包时，返回的就是`main`字段所列出的文件的 `module.exports` 属性；如果不指定该字段，默认是项目根目录下的`index.js`。如果没找到，就会报错
```json
"main": "./src/index.js"
```

- browser：可以定义 `npm` 包在 `browser` 环境下的入口文件；如果 `npm` 包只在 `web` 端使用，并且严禁在 `server` 端使用，使用 `browser` 来定义入口文件
```json
"browser": "./src/index.js" 
```


* module：可以定义 `npm` 包的 `ESM` 规范的入口文件，`browser` 环境和 `node` 环境均可使用 如果 `npm` 包导出的是 `ESM` 规范的包，使用 `module` 来定义入口文件
```json
"module": "./src/index.mjs"
```
> `.js` 文件是使用 `commonJS` 规范的语法`(require('xxx'))`，`.mjs` 是用 `ESM` 规范的语法`(import 'xxx')`


* bin：用来指定各个内部命令对应的可执行文件的位置；可以是 `string` 值，当有多个的时候可以用键值对的形式写，不过要执行这些文件，需要在文件头部加上 `#!/usr/bin/env node`
```json
// 写法一
"name": "my-cli",
"bin": "./bin/cli.js"
// 等价于
"bin": {
  "my-cli": "./bin/cli.js"
}
```
> 在项目内安装依赖时：会建立符号链接`node_modules/.bin/my-cli` 由于`node_modules/.bin/`目录会在运行时加入系统的`PATH`变量，因此在运行`npm`时，就可以不带路径，直接通过命令来调用这些脚本所有`node_modules/.bin/`目录下的命令，都可以用`npm run [命令]`的格式运行
> 在全局安装依赖时：`npm`包将链接这个文件到`prefix/fix`里面，以便全局引入，就是会在当前的`node`环境下的`bin`目录中创建一个命令


* files：`npm publish` 和`npm install` 操作该依赖包所包含的文件，`files`指定的文件会被推送到`npm`服务器中；如果指定的是文件夹，那么该文件夹下面所有的文件都会被提交
```json
"files": [
  "index.js",
  "lib/"
]
```
> `.npmignore`文件中的文件即便被写在`files`属性里也会被排除在外

- man：可以指定一个或多个文件，当执行`man {包名}`时，会展现给用户文档内容
> man命令是 Linux 中的帮助指令
> man文件必须以数字结尾，如果经过压缩，还可以使用.gz后缀；这个数字表示文件安装到哪个 man 节中


- directories：用来规范项目的目录 `node.js` 模块是基于 `CommonJS` 模块化规范实现的，需要严格遵循 `CommonJS` 规范。模块目录下除了必须包含包项目描述文件 `package.json` 以外，还需要包含`bin、lib、doc、test`等目录

在实际的项目目录中，我们可能没有按照这个规范进行命名，那么就可以在`directories`字段指定每个目录对应的文件路径
```json
"directories": {
  "bin": "./bin", // 存放可执行二进制文件的目录
  "lib": "./lib", // 存放js代码的目录
  "doc": "./doc", // 存放文档的目录
  "test" "./test", // 存放单元测试用例代码的目录
  "man": "./man" //
}
```

### 发布配置
- license：软件的开源协议
* private：决定我们的项目是否会发布，如果设置为`true` 那么 `npm` 会拒绝发布（一般为公司内部私有库）
* publishConfig：模块发布时生效，设置一些值的集合，会配合`private`来使用，如模块被发布到一个特定的`npm`仓库
```json
"private": true,
"publishConfig": {
  "tag": "1.1.0",
  "registry": "https://registry.npmjs.org/",
  "access": "public"
}
```

### 三方配置
* typings：指定`typescript`的入口文件 该字段的作用和`main`配置相同
```json
"typings": "types/index.d.ts"
```

* unpkg：该字段可以让 `npm` 上所有的文件都开启 `cdn` 服务，该`CND`服务由`unpkg`提供
```json
"unpkg": "dist/vue.js"
```

* workspaces 该字段用于yarn workspace monorepo
```json
"workspaces": [
  "packages/mrp-*"
]
```

* exports：该字段（或 "export map"）提供了一种方法来为不同的环境和 `JavaScript` 风格公开您的包模块，同时限制对其内部部分的访问
```
my-awesome-lib
├── lib/
│   ├── whole-lib.browser.js (iife 格式)
│   ├── public-module-a.cjs  (commonjs 格式)
│   ├── public-module-a.mjs  (esmodule 格式)
│   ├── public-module-b.cjs
│   ├── public-module-b.mjs
│   └── internals/
│       ├── private-module-c.cjs
│       └── private-module-c.mjs
├── package.json
└── …
```
想要导出 `module-a` 和 `module-b` 同时限制 `module-c` 我们还希望我们的包提供 `CommonJS` 和 `ESModule` 输出

```json
{
  "name": "my-awesome-lib",
  ...
  "exports": {
    ".": {
      "browser": {
        "default": "./lib/whole-lib.browser.js"
      }
    },
    "module-a": {
      "import": "./lib/public-module-a.mjs",
      "require": "./lib/public-module-a.cjs"
    },
    "module-b": {
      "import": "./lib/public-module-b.mjs",
      "require": "./lib/public-module-b.cjs"
    }
  }
}

```

通过提供有关我们的包的以下信息 `my-awesome-lib`，我们现在可以像这样在任何地方（受支持）使用它

```js
// CommonJS flavor
const moduleA = require('my-awesome-lib/module-a')

// ESModule flavor
import moduleA from 'my-awesome-lib/module-a'

// 行不通的！
const moduleA = require('my-awesome-lib/lib/public-module-a')
const moduleC = require('my-awesome-lib/internals/private-module-c')
import moduleA from 'my-awesome-lib/lib/public-module-a'
import moduleC from 'my-awesome-lib/internals/private-module-c'
```

### 参考文献

[官方文档地址](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
[package.json，你知道多少](https://juejin.cn/post/7023539063424548872#heading-12)
[Node.JS（新）Package.json exports 字段](https://www.cnblogs.com/taohuaya/p/15573719.html)