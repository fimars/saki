# 在Elixir的中迷失

#### 片段0

当我想要请求一份网络资源时，我会尝试这样做

```ts
const response = await fetch(`uri`);
console.log(response.body);
// ...
doSomething(response.body);
```

然后呢？

当我想要在elixir中做一样的事情，我的第一反应是寻找我的`fetch`。噢不是，我是需要给我的fetch寻找一个父节点。没有树状进程的elixir程序是没有灵魂的，joe和我说。是这样的，上面的缺陷语言都在单个进程里，await逻辑是那么的丑陋。

在elixir森林中，我需要寻找一个等待处理结果的工作者，寻找一个执行socket操作的工作者，和他们的管理者。对，就是这样

```elixir
defmodule Entry do
	def start_link() do
		Fetch.start(uri, handle??)
	end
end

defmodule Fetch do
	start(uri) do
		loop do
			Socket ! uri;
			msg = flush();
			handle(msg);
		end
	end
end
```

我的天，我完全不知道我在做什么，callback地狱吗，我的黑暗的记忆开始攻击我，我的elixir到底学了什么？