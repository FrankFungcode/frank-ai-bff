import { addAliases } from "module-alias";

addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
});

import config from "@config/index";

// views\index.html 中 {{ data }}  服务端渲染
import render from "@koa/ejs"; // 后端模板引擎EJS koa/ejs
     
import { createContainer, Lifetime } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";
import Koa from "koa";

const app = new Koa();

// ** 1. 创建容器 来自 awilix
const container = createContainer();

const { port, memoryFlag, viewDir } = config;

// ** 2. 所有的可以被注入的代码都在container中
container.loadModules([`${__dirname}/services/*{.ts,.js}`], {
  formatName: "camelCase",
  resolverOptions: {
    // 1. 每次请求创建一个新的实例
    // 2. 单例模式
    lifetime: Lifetime.SCOPED,
  },
});

// 把 路由 和 容器 进行关联（绑定在一起）
app.use(scopePerRequest(container));

// 服务端渲染
render(app, {
  root: viewDir,
  layout: false,
  viewExt: "html",
  cache: memoryFlag,
  debug: false,
});

// awilix 会自动的分析 构造函数需要哪些 service，如ApiController 中的，然后从容器中取出来，注入进去
// ** 3. 把所有的路由全部load进来
app.use(loadControllers(`${__dirname}/routers/*{.ts,.js}`));

app.listen(port || 8081, () => {
  console.log("server is running at http://localhost:8081");
});

export default app;
