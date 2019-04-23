---
title: TC39 globalThis
---



## TC39 `globalThis`

>  草案地址: [Ref](<https://github.com/tc39/proposal-global#html-and-the-windowproxy>)

### 故事的开始

在9102年的ECMAScript(文后戏称JS)世界里，JS已经不是当年那跑在浏览器里的脚本语言了。我们一拍脑子能想到的运行环境就有：

- 浏览器
- Node.js
- 根据草案实现的各个`Standalone`版本（可见此工具的[README](https://github.com/GoogleChromeLabs/jsvu)

为了JS可以在不同的**运行环境**下都访问到自己想要的那个全局的`this`, 于是就有了这个草案，也有了我读了某片博客之后的这篇记录。

### The Polyfill

> 以下polyfill的思路来自Mathiasbynens的一片[博客](https://mathiasbynens.be/notes/globalthis#naive-polyfill)

首先，我们分析一下目前JS的几个运行环境;

浏览器中我们有`window`对象和`frames`对象:

```java
globalThis === window; // true
globalThis === frames; // true
```

虽然在`web wrokers`中window为`undefined`, 但是浏览器扩展中也实现了一个叫做`self`的对象:

```javascript
globalThis === self; // true
```

在 Node.js 中也有很熟悉的`global`对象:

```javascript
globalThis === global; // true
```

就如同我们文章开头提到的, 还有一些独立的JS实现, 就没有以上这些宿主环境的全局对象。这种情况可以直接去访问全局的`this`:

```javascript
globalThis === this; // true
```

而且，在sloppy模式(即没有开启严格模式)下，函数的this总是指向全局的this，所以就算我们不能像上一个例子一样在全局环境下直接访问`this`, 也可以通过一个简单的匿名函数去获得:

```javascript
globalThis === (function () {
  return this;
}); // true
```

然鹅，在大部分JS模块标准实现中，最顶层的函数的this一般是`undefined`，而且函数在严格模式下的`this`也是`undefined`, 所以上面这个思路也不行。

到这个地方，Mathias给了一个特别trick的方法，在严格模式下生成非严格模式的函数：

使用`Function`构造器:

```javascript
globalThis === Function('return this')(); // true
```

当然使用`eval`也一样:

```javascript
globalThis === (0, eval)('this');
```

在现代浏览器中，`Funciton`构造器和`eval`通常被[Content Security Policy(CSP)`](http://www.ruanyifeng.com/blog/2016/09/csp.html)限制使用。虽然一般的网站可以选择是否遵循这个准则，但在Chrome插件中则是强制遵循。简而言之，这个polyfill并不能通过这种trick的方法来实现。

### A Naive Polyfill

根据上文的分析，我们能够得到一个不是很健全的Polyfill实现:

```javascript
// Ref: https://mathiasbynens.be/notes/globalthis#naive-polyfill
// A naive globalThis shim. Don’t use this!
const getGlobal = () => {
	if (typeof globalThis !== 'undefined') return globalThis;
	if (typeof self !== 'undefined') return self;
	if (typeof window !== 'undefined') return window;
	if (typeof global !== 'undefined') return global;
	if (typeof this !== 'undefined') return this;
	throw new Error('Unable to locate global object');
};
// Note: `var` is used instead of `const` to ensure `globalThis`
// becomes a global variable (as opposed to a variable in the
// top-level lexical scope) when running in the global scope.
var globalThis = getGlobal();
```

如前文所说，不支持严格模式，在某些非浏览器环境下的模块化组件函数哪无法使用。

### A Robust Polyfill

那么是否有可能写一个健壮的polyfill实现呢? 在总结如下条件的情况下:

- 我们不能依赖环境实现的`globalThis`, `window`, `self`, `global` 或 `this`；
- 不能使用trick的`Function`构造器和`eval`；
- 但是你可以仔细考虑一下JS本身所具备的功能。

下面有这么一个不算漂亮的实现方案；但是在这之前，让我们考虑一些问题：

我们如何在不考虑`globalThis`从哪里来的前提下，获取`globalThis`本身呢? 如果我们可以添任意一个函数在`globalThis`上，并且我们可以把它当作`globalThis`的方法来执行，同时它放回的就是`this`:

```javascript
globalThis.foo = function () {
  return this;
}
var globalThisPolyfilled = globalThis.foo();
```

问题就来了，我们到底如何在不依赖`globalThis`或者任何环境实现的宿主上绑定这样一个函数呢, 这个条件下我们只能得到下文这样的东西：

```javascript
function foo() {
  return this;
}
var globalThisPolyfilled = foo();
```

`foo()`并不是作为某个对象的方法被执行的, 在严格模式，一些模块化的模块函数哪,`this`理所当然得是`undefined`。

然而，作为某个对象的`getters`, `setters`就不一样了：

```javascript
Object.defineProperty(globalThis, '__magic__', {
	get: function() {
		return this;
	},
	configurable: true // 后续可以删除
});

var globalThisPolyfilled = __magic__;
delete globalThis.__magic__;
```

我们给现在如果直接给`globalThis`添加一个`getter`返回`this`，这个getter会直接返回当前的`this`；但是我们根本的问题没有解决，我们还是需要依赖`GlobalThis`。如何把这个函数安装这样一个全局的`getter`并且不依赖`globalThis`呢？

我们可以把这个`getter`安装到被全局`this`继承的`Object.prototype`上:

```javascript
Object.defineProperty(Object.prototype, '__magic__', {
	get: function() {
		return this;
	},
	configurable: true
});
var globalThis = __magic__;
delete Object.prototype.__magic__;
```

**⚠️ ECMAScript Spec 并没有强制要求全局的`this`继承于`Object.prototype`，如果通过`Object.create(null)`的方式生成一个全局使用的`Object`也是可以的，而且 IE7 就是这样做的，幸运的是现代浏览器都是通过`Object.prototype`继承的**

为了避免浏览器已经实现了`globalThis`, 我们简单得调整一下:

```javascript
(function() {
	if (typeof globalThis === 'object') return;
	Object.defineProperty(Object.prototype, '__magic__', {
		get: function() {
			return this;
		},
		configurable: true // This makes it possible to `delete` the getter later.
	});
	__magic__.globalThis = __magic__; // lolwat
	delete Object.prototype.__magic__;
}());

// Your code can use `globalThis` now.
console.log(globalThis);
```

Mathias在文末说到，这可能是你见过最可怕的Polyfill，因为它完全违背了流行的做法：**即不修改不属于你的对象，避免操作内置的原型对象**。

[通过`jsvu`测试这个Polyfill](https://mathiasbynens.be/notes/globalthis#testing)

