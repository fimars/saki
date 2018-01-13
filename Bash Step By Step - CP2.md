## Bash Guide Notes 📒

> Bash Guide: http://guide.bash.academy/expansions/
>
>  The Chapter: Variables and Expansions



今天也有在看Parcel和Parcel的代码，因为自己的项目用到了这个新的Bundler库，看到一个很有意思的[issue](https://github.com/parcel-bundler/parcel/issues/110#issuecomment-350259878)。里面这个shell蛮有意思的。



### 路径扩展 (Pathname Expansion)

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



### 命令子句

形式非常简单，看下面的例子，用`$(…)`来说明这是条命令子句。值得注意的是只能用在**双引号**内

```bash
$ echo "The File <hello.txt>: $(cat hello.txt)"
```



### Re-use Code

复用代码，是最基本的抽象。为了让我们从简单的命令中更进一步，必须开始思考如何 re-use 代码了。先从Bash的变量开始。

### Shell 变量

基本形式

```bash
# error
$ name = 1 # bash中的`=`左右两边是不允许出现空格的
bash: name: command not found

# right
$ name=1
$ echo $name # 通过`$`去获取变量
1 # result
```

还能用一下上面的命令子句

```bash
$ qiaqia="$(cat qiaqia.txt)" # good job
```

还能在字符串中插入变量 (即: Parameter Expansion)

```bash
$ name="hali bote" time=23.23
$ echo "$name's current record is $times."
hali bote's current record is .
$ echo "$name's current record is ${time}s."
hali bote's current record is 23.23s.
```

