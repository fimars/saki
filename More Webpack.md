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

**开发环境**

- webpack编译过程图形化输出 [webpackbar](https://github.com/nuxt/webpackbar)

**性能调优，问题调试插件**

- 打包性能分析插件 [Wepack.ProfilingPlugin](https://webpack.js.org/plugins/profiling-plugin/)
- Stats输出插件 [StatsPlugin](https://github.com/unindented/stats-webpack-plugin)
- 打包结果体积可视化 [WebpackBundleAnalyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)



*未完*