import Koa from "koa";
import { config as dotenv } from "dotenv";
import json from "koa-json";
import koaBody from "koa-body";

const { sequelize } = require("./models");

const app = new Koa();
const apiRouter = require("./router/api");

dotenv();

sequelize.sync();

app
  .use(json())
  .use(koaBody())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())
  .use(async (ctx) => {
    ctx.status = 404;
    ctx.body = {
      message: "not found",
      code: 404,
    };
  });

if (process.env.APP_PORT) {
  app.listen(process.env.APP_PORT);
  console.info(" App is listening on:", process.env.APP_PORT);
} else {
  app.listen(3000);
  console.info(
    " App is listening on: 3000 \n To change app port setup it in dotenv file!"
  );
}
