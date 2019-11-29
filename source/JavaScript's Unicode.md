---
title: JS中的Unicode
date: 2019-11-29
---

# JS中的Unicode

缘起于知识星球的某个用户在自己的名字中使用了[U+202E](https://codepoints.net/U+202E)的从右向左显示控制字符，让我对这个事情有了些许的兴趣

### js中使用的unicode版本

关于Unicode团队和USC团队，从网上随处可见的描述可以得知——目前由于历史原因，JS中的unicode字符确实会带来不大不小的坑。

> UTF（Unicode transformation format）Unicode 转换格式，是服务于 Unicode 的，用于将一个 Unicode 码点转换为特定的字节序列。常见的 UTF 有
>
> > UTF-8 可变字节序列，用 1 到 4 个字节表示一个码点
> > UTF-16 可变字节序列，用 2 或 4 个字节表示一个码点
> > UTF-32 固定字节序列，用 4 个字节表示一个码点
>
> [UTF-8](https://en.wikipedia.org/wiki/UTF-8) 对 ASCⅡ编码是兼容的，都是一个字节，超过 U+07FF 的部分则用了复杂的转换方式来映射 Unicode，具体不再详述。
>
> UTF-16 对于 BMP 的码点，采用 2 个字节进行编码，而 BMP 之外的码点，用 4 个字节组成代理对（surrogate pair）来表示。其中前两个字节范围是 U+D800 到 U+DBFF，后两个字节范围是 U+DC00 到 U+DFFF，通过以下公式完成映射（H：高字节 L：低字节 c：码点）
> H = Math.floor((c-0x10000) / 0x400)+0xD800
> L = (c - 0x10000) % 0x400 + 0xDC00
>
> 比如💩用 UTF-16 表示就是"\uD83D\uDCA9"
>
> UCS（Universal Character Set）通用字符集，是一个 ISO 标准，目前与 Unicode 可以说是等价的。
> 相对于 UTF，UCS 也有自己的转换方法（编码）。如
>
> > UCS-2 用 2 个字节表示 BMP 的码点
> > UCS-4 用 4 个字节表示码点
>
> UCS-2 是一个过时的编码方式，因为它只能编码基本平面（BMP) 的码点，在 BMP 的编码上，与 UTF-16 是一致的，所以可以认为是 UTF-16 的一个子集。
> UCS-4 则与 UTF-32 等价，都是用 4 个字节来编码 Unicode。

## 常见问题

### 字符串处理

**string.length**

超过BMP的unicode字符的length会得到 2，可以通过正则表达式解决：

```javascript
var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // 匹配UTF-16的代理对
function countSymbols(string) {
  return string
  	.replace(regexAstralSymbols, '_')
  	.length;
}
```

**string.split**

并且，由上面`.length`的情况可以猜测得到，`.split`一样会把这个两位的usc-2码点当作两个字符来处理。如果此时紧随着一个反转操作，不堪入目。（解决办法是通过新的Array.from方法去对字符串进行处理）。

**string.fromCharCode**

这个东西呢，虽然传不了usc-4的值，但是你可以算出高位低位传两个参数进去。不过这也被新方法`.fromCharPoint`完美解决了。

**正则表达式.匹配**

现在支持u-flag了，就酱

```javascript
/foo.bar/.test('foo🔟bar') // false
/foo.bar/u.test('foo🔟bar') // true
```



### 号外 

开头说到的那个用户，就是通过一个控制方向字符达到如下的效果

字符串内容`"某某某亲了(\u202e下一(\u202d 回复者"`，由于U+202E前面这部分会变成`某某某亲了(\u202d回复者)一下`，然后又通过U+202d去让后续回复者的内容从左向右显示，达到了某某某亲了回复者一下的效果。



### 参考

1. http://www.alloyteam.com/2016/12/javascript-has-a-unicode-sinkhole/
2. https://mathiasbynens.be/notes/javascript-unicode