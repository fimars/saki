(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{29:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n(30),i=n.n(o),c=n(31),a=n.n(c),l=function(){return r.createElement("div",{className:"markdown-body section",dangerouslySetInnerHTML:{__html:'<p><img src="./Saki.png" alt="Saki Logo"></p>\n<blockquote>\n<p>Welcome to <code>Saki</code>, 一个没什么内容的Blog</p>\n</blockquote>\n<h2 id="关于我">关于我</h2>\n<ul>\n<li>喜欢玩: <a href="http://www.celestegame.com/">Celeste</a></li>\n<li>喜欢的番剧: <code>物语系列</code></li>\n<li>上一本看的书: 夏目漱石的《我是猫》</li>\n<li>使用较多的语言: TypeScript, Elixir</li>\n<li><a href="https://github.com/fimars/">Github: fimars</a></li>\n<li><a href="https://twitter.com/_fimars">Twitter: fimars</a></li>\n</ul>\n<h3 id="怎么样的一个人呢？">怎么样的一个人呢？</h3>\n<p>只会一点点前端开发，是鄙视链最底层的程序员；偶尔写一点自己能用得上的代码和能喂饱自己的代码；说是Elixir本当上手，根本就没有写过什么像样的东西！最近在拿着webpack折腾，稍微弄明白了一点点关于webpack的一些基本概念。</p>\n<p>其他方面的话；因为特别喜欢一个歌手，买了一把便宜的<code>takamine</code>正在练习吉他中；玩了Celeste之后偶尔会想去登山；饮料的话只喝茶茶茶，其他的也不是不可以，但是还是喜欢茶。</p>\n<p>看了一眼自己的commit记录，周末从来不写代码成就获得，以上。</p>\n'}})};e.default=function(){return r.createElement(i.a,{Side:r.createElement(a.a,{headings:[{id:"关于我",level:2,parent:null,text:"关于我"},{id:"怎么样的一个人呢？",level:3,parent:null,text:"怎么样的一个人呢？"}]}),Content:r.createElement(l,null)})}},30:function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});e.__esModule=!0;var i=n(1),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this.props,e=t.Side,n=t.Content;return i.createElement("div",null,i.createElement("div",{className:"columns"},i.createElement("div",{className:"side"},i.createElement("div",{className:"nav section"},e)),i.createElement("div",{className:"content",style:{width:"calc(100% - 220px)",float:"left"}},n)))},e}(i.PureComponent);e.default=c},31:function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};e.__esModule=!0;var c=n(1),a=n(6),l=n(32),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this;return this.props.headings.map(function(e,n){return c.createElement(l.default,{key:n,level:e.level},c.createElement(a.Link,i({},t.getLinkProps(e))))})},e.prototype.getLinkProps=function(t){var e=t.text.replace(/\(.*\)/,"");return{dangerouslySetInnerHTML:{__html:e},replace:!1,to:"#"+encodeURIComponent(e)}},e}(c.Component);e.default=s},32:function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});e.__esModule=!0;var i=n(1),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this.props,e=t.level,n=t.children;return i.createElement("div",{className:"nav-label-item level-"+e+" "+(n&&"has-child")},n)},e}(i.PureComponent);e.default=c}}]);