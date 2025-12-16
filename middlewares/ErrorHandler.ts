/*
 * @Author: FrankFungcode combeebe@gmail.com
 * @Date: 2025-12-13 15:27:23
 * @LastEditors: FrankFungcode combeebe@gmail.com
 * @LastEditTime: 2025-12-16 00:27:16
 * @FilePath: \frank-ai-bff\middlewares\ErrorHandler.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** biome-ignore-all lint/complexity/noStaticOnlyClass: <静态类设计符合当前中间件封装需求> */
import type Koa from 'koa';
import type { Context } from 'koa';
import type { Logger } from 'log4js';

class ErrorHandler {
  static error(app: Koa, logger: Logger) {
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (e) {
        logger.error(e);

        // 设置状态码
        ctx.status = 500;
        // 构造错误信息
        const errorMessage = e.stack;

        // 使用 ctx.render 渲染 500 页面
        await ctx.render('500', {
          errorMessage,
        });
      }
    });
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      await next();
      if (ctx.status !== 404) {
        return;
      }
      await ctx.render('404');
    });
  }
}
export default ErrorHandler;
