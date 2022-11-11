*FROM:https://react-typescript-cheatsheet.netlify.app/*

version...: React v18

# React + TypeScript 的旅行



## 1. React.FC

https://github.com/facebook/create-react-app/pull/8177

- 隐性的 props.children 声明，会让组件无意中接受/收 `children`

- FC<Props>无法接收泛型Props，扩展性差

- 和 "component as namespace pattern" 一起使用时会非常尴尬

```tsx
<Select>
  <Select.Item />
</Select>

const Select: React.FC<SelectProps>
      & { Item: React.FC<ItemProps> } = (props) => {/* ... */ }
Select.Item = (props) => { /*...*/ }
```

- Doesn't work correctly with defaultProps

```tsx
type  ComponentProps = { name: string; }

const  Component = ({ name }: ComponentProps) => (
    <div>
		{name.toUpperCase()} /* Safe since name is required */
	</div>
);
Component.defaultProps = { name: "John" };

const  Example = () => (<Component />) /* Safe to omit since name has a default value */
```



- 这样的声明变长了，甚至和直接展开这个类型写差不多

- 唯一的好处：明确声明了返回值


## 2. `Type`s or `Interface`s?

> Use Interface until You Need Type - [orta](https://twitter.com/orta/status/1356129195835973632?s=20).
>
> Read More: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

### Useful table for Types vs Interfaces

| Aspect                                              | Type | Interface |
| --------------------------------------------------- | ---- | --------- |
| Can describe functions                              | ✅    | ✅         |
| Can describe constructors                           | ✅    | ✅         |
| Can describe tuples                                 | ✅    | ✅         |
| Interfaces can extend it                            | ⚠️    | ✅         |
| Classes can extend it                               | 🚫    | ✅         |
| Classes can implement it (`implements`)             | ⚠️    | ✅         |
| Can intersect another one of its kind               | ✅    | ⚠️         |
| Can create a **union** with another one of its kind | ✅    | 🚫         |
| Can be used to **create mapped types**              | ✅    | 🚫         |
| Can be mapped over with mapped types                | ✅    | ✅         |
| Expands in error messages and logs                  | ✅    | 🚫         |
| Can be augmented                                    | 🚫    | ✅         |
| Can be recursive                                    | ⚠️    | ✅         |

⚠️ In some cases

## 3. Custom Hooks

use [TS 3.4 const assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions):

```tsx
export function useLoading() {
    return [isBol, load] as const 
    // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}


// if you are having trouble with const assertions,
function tuplify<T extends any[]>(...elements: T) {
  return elements;
}
function useTuple() {
    return tuplify(numValue, funValue);
}
```



