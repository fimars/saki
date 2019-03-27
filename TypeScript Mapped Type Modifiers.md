---
title: More TypeScript
date: 2019-03-27
---

## TypeScript中的Mapped Type Modifiers

###  Context

在TS2.8版本更新中，你可以发现他提供了一些新的关键字：`Partical`. `Required`等；

首先你有一个这样的`interface`

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

简单来说，TS2.8的中所说的Mapped Type Modifiers大体都是类似的操作，此文只是抛砖引玉，具体的可以看2.8的更新日志