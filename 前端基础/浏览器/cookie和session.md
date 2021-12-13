### Cookie 与 Session
作用：`http`请求是无状态的协议，服务端无法确认当前访问者的身份信息。`Cookie`和`Session`可以用于告知服务端前后两个请求是否来自同一浏览器

- `Cookie`存储在客户端(浏览器)：是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上；
- `Cookie` 不可跨域： 每个`Cookie`都会绑定单一的域名，无法在别的域名下获取使用，一级域名和二级域名之间是允许共享使用的（靠的是`domain`）
- `Cookie`的一些属性：
  1. `name=value`：键值对，都必须是字符串类型
  2. `domain`：指定cookie所属域名，默认是当前域名
  3. `path`：指定cookie在哪个路径（路由）下生效，默认是 '/'，如果设置为 /abc，则只有 /abc 下的路由可以访问到该cookie，如：/abc/read
  4. `maxAge`：cookie失效的时间，单位秒。如果为整数，则该cookie在maxAge秒后失效。如果为负数，该 cookie为临时cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该cookie。如果为0，表示删除该 cookie。默认为-1（比expires好用）
  5. `expires`：过期时间，在设置的某个时间点后该cookie就会失效。一般浏览器的cookie都是默认储存的，当关闭浏览器结束这个会话的时候，这个cookie也就会被删除（默认为session）
  6. `secure`：当secure值为true时，cookie在HTTP中是无效，在HTTPS中才有效（默认为false）
  7. `httpOnly`：如果给某个cookie设置了httpOnly属性，则无法通过JS脚本 读取到该cookie的信息，但还是能通过 Application中手动修改cookie，所以只是在一定程度上可以防止XSS攻击，不是绝对的安全

- `Session`存储在服务端：是另一种记录服务器和客户端会话状态的机制；是基于`cookie`实现的，`session`存储在服务器端，`sessionId`会被存储到客户端的`cookie`中
`session`认证流程：
1. 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的`Session`
2. 请求返回时将此`Session`的唯一标识信息`SessionID`返回给浏览器，会在浏览器的响应头中携带`set-cookie：SessionID=xxx`
3. 浏览器接收到服务器返回的`SessionID`信息后，会将此信息存入到`Cookie`中，同时`Cookie`记录此 `SessionID`属于哪个域名（一般为接口的地址域名）
4. 当用户第二次访问服务器(请求接口地址)的时候，请求会自动判断此域名下是否存在`Cookie`信息，如果存在自动将`Cookie`信息也发送给服务端，服务端会从`Cookie`中获取`SessionID`，再根据`SessionID`查找对应的`Session`信息，如果没有找到说明用户没有登录或者登录失效；如果找到`Session`证明用户已经登录可执行后面操作

> 注意：在服务端设置的`session`，返回的请求头中`set-cookie`是保存在服务端域名下的(而不是本地请求页面的域名下)</n>
一般没有特殊设置，在服务端端设置的`cookie`，返回的请求头中set-cookie也是设置在服务端的域名下</n>
可以在浏览器的`所有 Cookie 和网站数据`中搜索查到</n>
如接口地址为：`http://192.144.232.22:4499/`，如果接口返回`set-Cookies：xxx`，没有做特殊处理，则会保存在`192.144.232.22`域名下

### 扩展 egg中使用Cookie和Session
https://eggjs.org/zh-cn/core/cookie-and-session.html

### 浏览器禁用三方 Cookie
原因：xxx
解决方案：xxx
