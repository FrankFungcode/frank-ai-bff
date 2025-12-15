/*
 * @Author: FrankFungcode combeebe@gmail.com
 * @Date: 2025-12-13 11:36:45
 * @LastEditors: FrankFungcode combeebe@gmail.com
 * @LastEditTime: 2025-12-15 22:36:29
 * @FilePath: \frank-ai-bff\services\ApiService.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { IApi, IData } from '@interfaces/IApi';

class ApiService implements IApi {
  async getInfo(): Promise<IData> {
    return { item: 'sample data', result: [1, 2, 3], status: 200 };
  }
  async getInfoData(): Promise<IData> {
    return { item: 'XXXXXX------------sample data', result: [4, 5, 6], status: 200 };
  }
}
export default ApiService;
