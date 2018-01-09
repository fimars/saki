## Bash Guide Notes 📒

> Bash Guide: http://guide.bash.academy/expansions/

### The Chapter: Variables and Expansions



#### 路径扩展 (Pathname Expansion)

看个例子:

```bash
$ cd ~/Downloads
$ rm -v *
removed '05 *****.ogg'
removed '07 *****.ogg'
$ls
$
```

`rm -v` 后面的`*`会匹配到`Downloads`下所有的文件，这套在bash上使用的扩展匹配符号被叫做`Glob`，下面这个表格来自[原文](http://guide.bash.academy/expansions/?=Pathname_Expansion#p1.1.0_4)。

| Glob            | 含义                                       |
| --------------- | ---------------------------------------- |
| `*`             | 匹配N个字符，N包括0                              |
| `?`             | 匹配0 ~ 1个字符                               |
| `[characters]`  | 匹配一个字符，范围来自`[...]`中的内容，类似正则表达式的`[]`      |
| `[:classname:]` | 类似上一个命令. 支持一系列模式，包括: _alnum_, _alpha_, _ascii_, _blank_, _cntrl_, _digit_, _graph_, _lower_, _print_, _punct_, _space_, _upper_, _word_, _xdigit_ |

可以指令开启更多的glob匹配，具体就不列举了，大概是正则表达式常用的符号[原文](http://guide.bash.academy/expansions/?=Pathname_Expansion#p1.1.0_9)。

```bash
$ shopt -s extglob
```

### ~ 符号

`echo ~` 就知道了, 指向你的`Home`目录