# 项目开发文档

## 项目结构

```
.
|-- public                 # 项目级公共资源（如 favicon）
|-- scripts                # 项目脚本
|-- src
|   |-- assets             # 业务静态资源
|   |   `-- img
|   |-- components         # 项目抽象组件
|   |   `-- api.js         # API URL 枚举
|   |-- pages              # 项目页面组件
|   |   |-- error          # 报错页组件
|   |   |-- login          # 登录页组件  [/login/]
|   |   `-- main           # 项目主页面组件
|   |       |-- about      # 关于页组件  [/about/]
|   |       |-- article    # 文章管理页组件 [/article/]
|   |       |-- home       # 首页组件 [/]
|   |       |-- user       # 用户管理页组件 [/user/]
|   |-- utils
|   |-- App.css
|   |-- App.js             # 项目入口
|   |-- App.test.js
|   |-- index.css
|   |-- index.js
|   |-- logo.svg
|   |-- README.md
|   `-- serviceWorker.js
|-- LICENSE
|-- package.json
|-- README.md
`-- yarn.lock
```

## 页面结构

路由请在 `src/App.js` 中配置。

主页面业务路由，需要另外在 `src/pages/main/index.js` 中指定业务子组件。

路由映射关系整理：

```
[/login/]         => `src/pages/login/index.js`          # 登录页面

[/]               => `src/pages/main/home/index.js`      # 首页

[/article/]       => `src/pages/main/article/list.js`    # 文章列表页
[/article/new/]   => `src/pages/main/article/list.js`    # 文章导入页

[/user/]          => `src/pages/main/user/list.js`       # 用户列表页
[/user/new/]      => `src/pages/main/user/item.js`       # 用户创建页
[/user/view/:id]  => `src/pages/main/user/item.js`       # 用户信息查看页
[/user/edit/:id]  => `src/pages/main/user/item.js`       # 用户信息修改页
```

## 项目配置

### 路由配置

1. `src/App.js` 配置页面路由。
2. `src/pages/main/index.js` 配置业务组件路由。

### API 配置

`src/components/api.js` 中配置各 API 枚举。

mock 借口采用 `eolinker` 服务。
