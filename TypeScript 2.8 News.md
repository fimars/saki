---
title: More TypeScript
date: 2019-03-27
---

## TypeScript 2.8 News

###  Context

之前稍微看了一篇关于Vuex类型的文章，再加上之前看过的Redux的源码，发现其中很多的功能都是TS2.8更新加入的特性，于是就有了念头讲讲这个版本加入的新内容。

### Conditional Type

看一个例子：

先来看一下最先提到的 `T extends U ? X  : Y`这样的一个语法，关键字有这些

### Mapped Type Modifiers

提供了一些新的关键字：`Partical`, `Required`等;

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

### 相关资源

- [TypeScript Evolution Blog](https://mariusschulz.com/blog/series/typescript-evolution)
- [TS2.8更新日志](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html)
- 在看更新过程中瞎搞的[TS Playground](https://typescript-play.js.org/#code/JYOwLgpgTgZghgYwgAgCoHsAm6CSkC2yA3gFDLnKYQDOCUwADmMOiAFzLVj0gDmA3GQoN66emACeAfg4AiABbBe82cgA+yWfgiZgAV3yqNsgDboA7rMEBfEiQSsuyMFnQBGDhmx4IhALzEQuRUtPRMLOyaAIIxsgA0QcgiLOIScorKsiTWgvaOYM6uAEyerj7+gRSUNHSMzKxyAELNWbZ5IE4u2ADMpd4EyAGkVSG14Q2aAMLT8YnJYsCSHHogVDCgOtl2kgwoAApwUMxwJl64BG6DlRQA2gDSyKDIANYQEugwaGUEALoAtDIvv1fPcfjZthJdsgDkdgCczuUrgAlCAARz0wCgOgAPAiCAA+fhAA)