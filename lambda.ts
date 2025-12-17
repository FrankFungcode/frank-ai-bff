/*
 * @Author: FrankFungcode combeebe@gmail.com
 * @Date: 2025-12-14 10:23:31
 * @LastEditors: FrankFungcode combeebe@gmail.com
 * @LastEditTime: 2025-12-16 21:22:24
 * @FilePath: \frank-ai-bff\lambda.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// AWS Lambda 入口文件 SAM
import serverless from 'serverless-http';
import app from './app';
export const handler = serverless(app);
