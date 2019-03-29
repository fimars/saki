---
title: More TypeScript
date: 2019-03-27
---

## TypeScript 2.8 News

###  Context

之前看了一篇关于Vuex类型的文章，发现其中很多的功能都是TS2.8更新加入的特性；刚好前几天看到一个写的非常好的博客(文末的TypeScript Evolution)，决定在这里做一个记录。

### Conditional Type

#### 0x00

条件类型的判断有点像`instance of`，写法如下：

```typescript
T extends U ? X : Y
```

语法上就是JavaScript中常见的条件表达式, `T` `U` `X` `Y` 代表任意类型。如你所见`T extends U`部分描述了`T`是否可以从`U`中扩展出来, 然后满足条件的话得到类型`X`, 否则得到 `Y`。

我们可以看一下lib.es5.d.ts里面预定义的`NonNullable`的写法学习一下:

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

如上所示，如果传入的类型`T`能够从`null | undefined`里扩展出来(即是空值)，那么就返回`never`, 反之则正常。

#### 0x01

`NonNullable`的一个使用场景(来自文末的typescript evolution):

```typescript
type EmailAddress = string | string[] null | undefined;
// 然后我们对他NonNullable并展开过程
type NonNullableEmailAddress = NonNullable<EmailAddress>;
type NonNullableEmailAddress = NonNullable<
	| string
    | string[]
    | null
	| undefined
>;
// 注意这一步是这样展开的
type NonNullableEmailAddress = 
	| NonNullable<string> // string
    | NonNullable<string[]> // string[]
    | NonNullable<null> // never
	| NonNullable<undefined> // never
;
// never因为是所有类型的子类型，在unnion type中我们可以忽略掉它
type NonNullableEmailAddress = string | string[];
```

### Mapped Type Modifiers

#### 0x10

这个要说一下2.8带来的相关新预定义类型：`Partical<T>`, `Required<T>`等;

首先有一个这样的`interface`

```typescript
interface TodoItem {
    description: string;
    priority?: "high" | "medium" | "low";
}
```

如果你需要把这个TodoItem的字段都变成必填的，很简单，你只需要使用keyof关键字取出所有的字段，再使用`-?`操作符去掉可选条件，然后简单得重新声明一下就好了。如下所示:

```typescript
type RequiredTodoItem = {
    [K in keyof TodoItem]-?: TodoItem[K] 
}
```

至于上面提到的`Required`关键字呢，就是做一模一样的事情的，所以你也可以这样子：

```typescript
type RTodoItem = Required<TodoItem>; // awesome
```

留意`[K in keyof T]`这部分，TS2.8的中所提供的Mapped Type Modifiers都是这类操作。

#### 0x11

我们再看看一个结合了`extends ? : `的预定义类型的例子, 用来帮助我们提取`interface`中不可为空的属性；(来自文末的typescript evolution):

首先有这样一个提取不可为空的`Keys`的类型:

```typescript
type NonNullablePropertyKeys<T> = {
  [P in keyof T]: null extends T[P] ? never : P
}[keyof T];
```

我们传入一个`interface`然后一步步展开:

```typescript
type User = {
    name: string;
    email: string | null;
}
type NonNullablePropertyKeys = NonNullablePropertyKeys<User>;
type NonNullablePropertyKeys = {
    [P in keyof User]: null extends User[P] ? never : P
}[keyof User];

// keyof User = "name" | "email"
// 再展开: 
// [P in "name" | "email"]: Type[P] = 
// { name: Type["name"], email: Type["email"] }

type NonNullableUserPropertyKeys = {
  name: null extends User["name"] ? never : "name";
  email: null extends User["email"] ? never : "email";
}[keyof User];

type NonNullableUserPropertyKeys = {
  name: "name"; // => | { name:""name", email: never }["name"]
  email: never; // => | { name:""name", email: never }["email"]
}["name" | "email"];

type NonNullableUserPropertyKeys = "name" | never // 然后可以消除 never
```

我们再往前推进一步, 讲一下新的预定义类型 `Pick<T, K extends keyof T>` :

```typescript
/**
 * From T, pick a set of properties
 * whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 结合上面的 NonNullablePropertyKeys

type NonNullableProperties<T> = Pick<T, NonNullablePropertyKeys<T>>
type NonNullableUserProperties = NonNullableProperties<User>;
// { name: string } 
```

great work~

#### 0x12

`infer`也是这次更新里面加入的一个条件类型用的关键字，用来声明类型变量的关键字。

获取First-Type:

```typescript
type First<T> =
  T extends [infer U, ...unknown[]]
    ? U
    : never;

type SomeTupleType = [string, number, boolean];
type FirstElementType = First<SomeTupleType>; // string
```

获取返回值类型:

```typescript
type ReturnType<T> =
  T extends (...args: any[]) => infer R
    ? R
    : any;

type A = ReturnType<() => string>;         // string
type B = ReturnType<() => () => any[]>;    // () => any[]
type C = ReturnType<typeof Math.random>;   // number
type D = ReturnType<typeof Array.isArray>; // boolean
```

需要注意的地方是，infer声明只能在条件判断类型的`true`分支里面使用。

### 0xff

基于上述的更新内容, TS2.8+添加了不少好用的预定义类型，可以去更新日志里面翻一下看看具体的关键字。

### 相关资源

- [conditional-types-in-typescript](https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/) 这篇文章下面那个redux的例子是开始有了一些兴趣

- [TypeScript Evolution Blog](https://mariusschulz.com/blog/series/typescript-evolution) 和更新日志的内容差不多
- [TS2.8更新日志](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) 
- [TS Playground](https://typescript-play.js.org/#code/JYOwLgpgTgZghgYwgAgCoHsAm6CSkC2yA3gFDLnKYQDOCUwADmMOiAFzLVj0gDmA3GQoN66emACeAfg4AiABbBe82cgA+yWfgiZgAV3yqNsgDboA7rMEBfEiQSsuyMFnQBGDhmx4IhALzEQuRUtPRMLOyaAIIxsgA0QcgiLOIScorKsiTWgvaOYM6uAEyerj7+gRSUNHSMzKxyAELNWbZ5IE4u2ADMpd4EyAGkVSG14Q2aAMLT8YnJYsCSHHogVDCgOtl2kgwoAApwUMxwJl64BG6DlRQA2gDSyKDIANYQEugwaGUEALoAtDIvv1fPcfjZthJdsgDkdgCczuUrgAlCAARz0wCgOgAPAiCAA+fhAA) Web TS Playground, 方便你随时折腾一下