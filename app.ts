import { addAliases } from "module-alias";

addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
});

import config from "@config/index";
import render from "@koa/ejs";
import { createContainer, Lifetime } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";
import Koa from "koa";

const app = new Koa();
// 创建容器
const container = createContainer();
const { port, memoryFlag, viewDir } = config;
// 所有的可以被注入的代码都在container中
container.loadModules([`${__dirname}/services/*{.ts,.js}`], {
  formatName: "camelCase",
  resolverOptions: {
    // 1. 每次请求创建一个新的实例
    // 2. 单例模式
    lifetime: Lifetime.SCOPED,
  },
});

// 把路由和容器进行关联
app.use(scopePerRequest(container));
render(app, {
  root: viewDir,
  layout: false,
  viewExt: "html",
  cache: memoryFlag,
  debug: false,
});
// 把所有的路由全部load进来
app.use(loadControllers(`${__dirname}/routers/*{.ts,.js}`));
app.listen(port || 8081, () => {
  console.log("server is running at http://localhost:8081");
});

export default app;
