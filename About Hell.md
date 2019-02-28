---
title: 从HellDoc这个项目中学到的东西
date: 2019-02-27
tags: HellDoc,工具,编程
---



> What I cannot create, I do not understand.  —— Feynman



`HellDoc`就是我拿来理解[`vuepress`](https://github.com/vuejs/vuepress/blob/master/)工作方式的一个玩具项目。开发的过程中遇到的问题正是我学习的机会，下面是一些我在这之前所不熟悉或事一知半解的内容:

### 文档的修改到应用到更新

**首先vuepress的一个设计提一下：**

vuepress会把收集到的md文件通过 [`markdown-loader`](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown-loader/index.js) 编译成一个个的vue组件，并且生成一个包括了这些组件的文档应用的route文件。

在这个前提下，`*.md`文件的修改理所当然得会被webpack自动捕捉到（因为已经在上面生成的route的依赖列表里了）；而对于目录上的文件增删则是用[`chokidar`](https://github.com/paulmillr/chokidar)做了文件目录的watch，触发的时候重新渲染`router`文件

### 热更新NodeJs程序

*TODO* 是关于require.cache的事情

### 更好的Logger提示

vuepress中让我觉得特别友好的log提示是怎么做到的

1. @vuepress/logger 统一的logger模块
2. [webpackbar](https://github.com/nuxt/webpackbar) 给你更直观的编译信息
3. 在需要的生命周期中添加合理的[log插件](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/webpack/DevLogPlugin.js)

### DevServer的路由设置

vuepress的dev指令是在本地编写文档的时候使用的，你可以从这里学到一个SPA应用在测试的时候webpackDevServer如何设置最为**自由**,**效率**

```javascript
// 摘自@vuepress/core dev.js
const serverConfig = Object.assign({
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'error',
    hot: true,
    quiet: true, // vuepress里面的log都通过插件或自己处理了
    headers: {
      'access-control-allow-origin': '*'
    },
    open: cliOptions.open,
    publicPath: ctx.base,
    watchOptions: {
      ignored: [
        /node_modules/,
        `!${ctx.tempPath}/**`
      ]
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /./, to: path.posix.join(ctx.base, 'index.html') }
      ]
    },
    overlay: false,
    host,
    contentBase,
    before (app, server) {
      if (fs.existsSync(contentBase)) {
        app.use(ctx.base, require('express').static(contentBase))
      }

      ctx.pluginAPI.options.beforeDevServer.syncApply(app, server)
    },
    after (app, server) {
      ctx.pluginAPI.options.afterDevServer.syncApply(app, server)
    }
  }, ctx.siteConfig.devServer || {})
```



### OVA

因为自己是TS用户，顺手帮社区补全了一下[`webpack-chian`](https://github.com/neutrinojs/webpack-chain/pull/132)的类型声明文件。

: )
