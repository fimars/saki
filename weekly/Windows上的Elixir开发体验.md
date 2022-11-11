# Windows上的Elixir开发体验

2022/11/04

### 权限？ 权限？

为什么我用新账户安装erlang他永远需要管理员权限运行?



2022/09/27

 ### 0x00 安装?

安装官方文档使用`scoop`安装

```powershell
scoop install erlang
scoop install elixir
```

设置 `hex `的国内镜像, 初始化 `hex`

```power
 # PowerShell
 $Env:HEX_MIRROR="https://hexpm.upyun.com";
 mix local.hex
```



### 0x01 试试 `phoenix`

先试试 `postgresql`

```powershell
# 安装
scoop install postgresql

# initdb 一下
initdb -D D:/PostgreSQL/pgsql/data -U postgres

# 启动psql
pg_ctl -D D:/PostgreSQL/pgsql/data -l logfile start

# 测试一下
psql -U postgres # works....!
```



安装 `phoenix` 脚手架, 启动项目

```powershell
mix archive.install hex phx_new
mix phx.new moee
```

 

Works !
