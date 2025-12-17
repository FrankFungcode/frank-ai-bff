/*
 * @Author: FrankFungcode combeebe@gmail.com
 * @Date: 2025-12-16 00:32:24
 * @LastEditors: FrankFungcode combeebe@gmail.com
 * @LastEditTime: 2025-12-16 21:29:09
 * @FilePath: \frank-ai-bff\app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { addAliases } from 'module-alias';

addAliases({
  '@root': __dirname,
  '@interfaces': `${__dirname}/interface`,
  '@config': `${__dirname}/config`,
  '@middlewares': `${__dirname}/middlewares`,
});

import config from '@config/index';

// views\index.html 中 {{ data }}  服务端渲染
import render from '@koa/ejs'; // 后端模板引擎EJS koa/ejs

import ErrorHandler from '@middlewares/ErrorHandler';

import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import Koa from 'koa';

import serve from 'koa-static'; // 静态资源中间件

import { configure, getLogger } from 'log4js';

const app = new Koa();

//日志系统
configure({
  appenders: { cheese: { type: 'file', filename: `${__dirname}/logs/yd.log` } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});

const { port, memoryFlag, viewDir, staticDir } = config;

// 静态资源生效节点
// 静态资源生效节点 -- 在创建容器·之前
app.use(serve(staticDir));

// ** 1. 创建容器 来自 awilix
const container = createContainer();

// ** 2. 所有的可以被注入的代码都在container中
container.loadModules([`${__dirname}/services/*{.ts,.js}`], {
  formatName: 'camelCase',
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
  viewExt: 'html',
  cache: memoryFlag,
  debug: false,
});

// 在路由生效前
const logger = getLogger('cheese');
ErrorHandler.error(app, logger);

// awilix 会自动的分析 构造函数需要哪些 service，如ApiController 中的，然后从容器中取出来，注入进去

//让所有的路由全部生效
// ** 3. 把所有的路由全部load进来
app.use(loadControllers(`${__dirname}/routers/*{.ts,.js}`));


if (process.env.NODE_ENV !== 'development') {
  // ECS EC2 本地运行 listen 端口 8081
  app.listen(port || 8081, () => {
    console.log('server is running at http://localhost:8081');
  });
}

export default app;
