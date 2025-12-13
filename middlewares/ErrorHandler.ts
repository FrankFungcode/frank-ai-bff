import type Koa from "koa";
import type { Context } from "koa";
import type { Logger } from "log4js";

class ErrorHandler {
    static error(ctx: Context, next: Koa.Next) { 
    }
}

export default ErrorHandler;
