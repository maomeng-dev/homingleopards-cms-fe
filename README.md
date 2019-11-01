# 猫盟 CFCA - 《带豹回家》官网后台

用于管理 **猫盟 CFCA - [《带豹回家》官网](https://homingleopards.org/)** 的后台，前端部分。

## 开始项目

由 `create-react-app` 搭建，使用 `Ant-Design` 构成页面。

项目代码相关，请参考 [项目开发文档](src/README.md) 。

### 环境

1. 安装 `Node.js` 环境。（[Node.js 官网](https://nodejs.org/zh-cn/)）

2. 安装 `Yarn`。（[Yarn 官网](https://yarnpkg.com/zh-Hans/)）

### 安装

1. Clone 项目。

``` shell script
git clone https://github.com/maomeng-dev/homingleopards-cms-fe.git
```

2. 安装依赖

``` shell script
yarn install
```

3. 启动项目

``` shell script
yarn start
```

4. 访问项目

浏览器访问 [http://localhost:3000](http://localhost:3000)

5. 进行开发

项目代码相关，请参考 [项目开发文档](src/README.md) 。

## 上线

1. 本地构建

``` shell script
yarn run online
```

执行命令，将前端资源构建打包为 `cms-fe-build.tar.gz` 。

2. 部署静态资源

将静态资源包，移动到生产环境服务器。（目前位置为： `/data/maomeng/cms-fe/` ）

## 依赖

* [Node.js](https://nodejs.org/zh-cn/)
* [Yarn](https://yarnpkg.com/zh-Hans/)
* [Ant Design](https://ant.design/index-cn)

## 参与

如果有任何问题，欢迎 [提 issue](https://github.com/maomeng-dev/homingleopards-cms-fe/issues)，或 `Fork` 后提起 `Pull request` 。

## License

使用 MIT License，查看 [LICENSE.md](LICENSE)
