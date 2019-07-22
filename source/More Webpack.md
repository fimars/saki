---
title: webpack使用者工具集
date: 2019-03-26
---

# More Webpack

最近这段时间接触Webpack比较多，整理一下比较好用的一些Webpack插件，以及相关的工具。比较常用的一些插件(如`html-webpack-plugin`)以及语言相关的loader就不放在这里了，这个并没有什么值得说的。

### 生态

**更舒服的Webpack**

- 编写更可读的webpack配置文件 [webpack-chain](https://github.com/neutrinojs/webpack-chain)
- 当你需要写loader时，可能需要 [loader-utils](https://github.com/webpack/loader-utils)
- 也许你感兴趣webpack的事件机 [tapable](https://github.com/webpack/tapable)
- 也许你感兴趣你看不见的文件在哪里 [memory-fs](https://github.com/webpack/memory-fs)

### 插件

**大概会用到**

- 对"新"JS支持更好的压缩插件 [terser-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
- webpack4必备的css提取插件 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- 如果你需要复制一些静态内容 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
- 如果你想让你的应用支持PWA [workbox](https://github.com/GoogleChrome/workbox)
- 如果你需要国际化支持 [i18n-webpack-plugin](https://github.com/webpack/i18n-webpack-plugin)

**开发环境**

- webpack编译过程图形化输出 [webpackbar](https://github.com/nuxt/webpackbar)

**性能调优，TreeShake情况分析，问题调试插件**

- 打包性能分析插件 [Wepack.ProfilingPlugin](https://webpack.js.org/plugins/profiling-plugin/)
- Stats输出插件 [StatsPlugin](https://github.com/unindented/stats-webpack-plugin)
- 打包结果体积可视化 [WebpackBundleAnalyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

### Tips

- common部分或者打包成DLL模块这部分尽量不要发生变化，才能在版本迭代的时候保证客户端缓存能被触发(视产品类型，宁可一开始就把整个组件库放进去)

- 大部分脚手架都有合理的生产环境打包配置，出现异常情况时，应该结合获取打包过程信息 `Stat` 的插件分析是不是某个模块或者某个写法导致 tree-shaking 没有合理触发。


### Next Version (Webpack 5)

**开发环境**

- 将会移除node.js的 `crypto` polyfills
- 优化开发环境打包结果，更合理的语意命名
- 优化开发时的打包缓存使用

**生产相关**

- 优化生产环境打包结果，无改动的模块还是一样的 chunkId，优化客户端缓存触发
- JS模块的导出命名调整成可预期的结果
- 优化 `无/少JS模块` 的打包结果（如样式模块）
- 细化 `缓存` 配置，指定缓存的模块，可自定义的缓存结果版本

**杂项**

- **Node Version: >=8.9.0**
- 一些逻辑上的bugs修复
- 一些配置默认值的修改
- `stat` 对象中根据新配置增加了相关信息
- 优化了 `tree-shaking` 对模块的来源分析
- 扩展对象的序列化功能
- Tapable 1 -> 2
- 优化了配置的类型，使用 `Set` 代替数组
- asyncWasm, topLevelAwait, import(Async/Await) 实验性支持


> 参考Tobias最近一次演讲的[slides](https://raw.githubusercontent.com/sokra/slides/master/data/webpack-5-whats-new.pdf)