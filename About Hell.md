---
title: 从HellDoc这个项目中学到的东西
date: 2019-02-27
tags: HellDoc,工具,编程
---

> What I cannot create, I do not understand. —— Feynman

`HellDoc`就是我拿来理解[`vuepress`](https://github.com/vuejs/vuepress/blob/master/)工作方式的一个玩具项目。开发的过程中遇到的问题正是我学习的机会，下面是一些我在这之前所不熟悉或事一知半解的内容:

### 1. Markdown 文件修改的即时更新

vuepress 会把收集到的 md 文件通过 [`markdown-loader`](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown-loader/index.js) 编译成一个个的 vue 组件，并且生成一个包括了这些组件的文档应用的 route 文件。

在这个基础上，`*.md`文件的修改理所当然得会被 webpack 自动捕捉到（因为已经在上面生成的 route 的依赖列表里了）；而对于目录上的文件增删则是用[`chokidar`](https://github.com/paulmillr/chokidar)做了文件目录的 watch，触发的时候重新渲染`router`文件

值得一提的是，在修改`config.js`这样的配置文件的时候：因为 nodejs 对 js-module 做了缓存的原因，无法触发文件更新，这时候就需要把`require.cache[absoluteFilePath]`的缓存内容删除，然后再进行后续的文档 App 部分的更新。

### 2. 非常友好的 Logger 提示

vuepress 中让我觉得特别友好的 log 提示是怎么做到的

1. @vuepress/logger 统一的 logger 模块
2. [webpackbar](https://github.com/nuxt/webpackbar) 给你更直观的编译信息
3. 在需要的生命周期中添加合理的[log 插件](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/webpack/DevLogPlugin.js)

### 3. DevServer 的路由设置参考

vuepress 的 dev 指令是在本地编写文档的时候使用的，你可以从这里学到一个 SPA 应用在测试的时候 webpackDevServer 如何设置最为**自由**,**效率**

```javascript
// 摘自@vuepress/core dev.js
const serverConfig = Object.assign(
  {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: "error",
    hot: true,
    quiet: true, // vuepress里面的log都通过插件或自己处理了
    headers: {
      "access-control-allow-origin": "*"
    },
    open: cliOptions.open,
    publicPath: ctx.base,
    watchOptions: {
      ignored: [/node_modules/, `!${ctx.tempPath}/**`]
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /./, to: path.posix.join(ctx.base, "index.html") }]
    },
    overlay: false,
    host,
    contentBase,
    before(app, server) {
      if (fs.existsSync(contentBase)) {
        app.use(ctx.base, require("express").static(contentBase));
      }

      ctx.pluginAPI.options.beforeDevServer.syncApply(app, server);
    },
    after(app, server) {
      ctx.pluginAPI.options.afterDevServer.syncApply(app, server);
    }
  },
  ctx.siteConfig.devServer || {}
);
```

### 4. @ts-check, @ts-ignore

在抽离为Hell服务的皮肤模块的时候，我意识到不需要那么严格的类型检查。通过`@ts-ignore`去忽略一些运行时添加的数据模块的`import`检查，后续再添加一些需要的类型(但实际上是一种无奈之举);`@ts-check`则相反，是给js文件带来一定的类型推导功能。



### 5. webpack如何模拟模块机制

TODO



### OVA

因为自己是 TS 用户，顺手帮社区补全了一下[`webpack-chian`](https://github.com/neutrinojs/webpack-chain/pull/132)的类型声明文件。

: )
