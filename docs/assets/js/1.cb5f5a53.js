(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[1],{24:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),r=n(64),o=n.n(r);e.default=function(){return i.a.createElement(o.a,{renderContent:function(){return i.a.createElement("div",{className:"markdown-body section",dangerouslySetInnerHTML:{__html:'<h2 id="关于我">关于我</h2>\n<ul>\n<li>喜欢玩: <a href="http://www.celestegame.com/">Celeste</a></li>\n<li>喜欢的番剧: <code>物语系列</code></li>\n<li>上一本看的书: 毛姆的《刀锋》</li>\n<li>使用较多的语言: TypeScript, Elixir</li>\n<li><a href="https://github.com/fimars/">Github: fimars</a></li>\n<li><a href="https://twitter.com/_fimars">Twitter: fimars</a></li>\n</ul>\n<h3 id="怎么样的一个人呢？">怎么样的一个人呢？</h3>\n<p>只会一点点前端开发，是鄙视链最底层的程序员；偶尔写一点自己能用得上的代码和能喂饱自己的代码；说是Elixir本当上手，根本就没有写过什么像样的东西！最近在拿着webpack折腾，稍微弄明白了一点点关于webpack的一些基本概念。</p>\n<p>其他方面的话；因为特别喜欢一个歌手，买了一把便宜的<code>takamine</code>正在练习吉他中；玩了Celeste之后偶尔会想去登山；饮料的话只喝茶茶茶，其他的也不是不可以，但是还是喜欢茶。</p>\n<p>看了一眼自己的commit记录，周末从来不写代码成就获得，以上。</p>\n'}})}})}},64:function(t,e,n){"use strict";var a=this&&this.__assign||function(){return(a=Object.assign||function(t){for(var e,n=1,a=arguments.length;n<a;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=!0;var r=n(22),o=n(12),l=n(7),u=n(0),c=i(n(0));e.default=l.withRouter((function(t){var e=o.siteData.pages.find((function(e){return e.path===t.match.path}))||{path:"",component:""};u.useEffect((function(){e.title&&(console.log(e.title),document.title=e.title)}));var n,i=o.layouts[(n="Layout",e.frontmatter&&e.frontmatter.layout&&(n=e.frontmatter.layout),n)];return c.default.createElement(r.PageDataContext.Provider,{value:e},c.default.createElement(i,a({},t)))}))}}]);