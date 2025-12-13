/*
 * @Author: FrankFungcode combeebe@gmail.com
 * @Date: 2025-12-13 11:31:42
 * @LastEditors: FrankFungcode combeebe@gmail.com
 * @LastEditTime: 2025-12-13 12:11:38
 * @FilePath: \frank-ai-bff\routers\IndexController.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GET, route } from "awilix-koa";
import type { Context } from "koa";
@route("/")
class IndexController {
  @GET()
  async actionList(ctx: Context): Promise<void> {
    const data = await ctx.render("index", {
      data: "Frank AI BFF --- Welcome 来自服务端数据",
    });
    ctx.body = data;
  }
}

export default IndexController;
