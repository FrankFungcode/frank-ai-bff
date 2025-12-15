/*
 * @Author: FrankFungcode combeebe@gmail.com
 * @Date: 2025-12-13 11:36:33
 * @LastEditors: FrankFungcode combeebe@gmail.com
 * @LastEditTime: 2025-12-15 22:41:29
 * @FilePath: \frank-ai-bff\routers\ApiController.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { IApi } from "@interfaces/IApi";
import { GET, route } from "awilix-koa";
import type { Context } from "koa";

@route("/api")
class ApiController {
  public apiService: IApi;
  //面向切面编程
  constructor({ apiService }: { apiService: IApi }) {
    this.apiService = apiService;
  }

  @route("/list")
  @GET()
  async actionList(ctx: Context) {
    const data = await this.apiService.getInfo();
    ctx.body = {
      data: data.item + Math.random(),
    };
  }
  @route("/listData")
  @GET()
  async getListData(ctx: Context) {
    const data = await this.apiService.getInfoData();
    ctx.body = {
      data: `status=${data.status}----${data.item}${Math.random()}`,
    };
  }
}
export default ApiController;
