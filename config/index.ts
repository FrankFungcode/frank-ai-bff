import { join } from "node:path";
import _ from "lodash";

let config = {
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"),
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8081, // 支持PM2 cluster模式设置端口
  memoryFlag: false, // 是否开启内存模式
};

if (process.env.NODE_ENV === "development") {
  const localConfig = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8081,
  };
  config = _.assignIn(config, localConfig);
}

if (process.env.NODE_ENV === "production") {
  const prodConfig = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8082,
    memoryFlag: "memory",
  };
  config = _.assignIn(config, prodConfig);
}

export default config;
