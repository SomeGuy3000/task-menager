const Koa = require('koa')
const json = require('koa-json')
const koaBody = require('koa-body')

const app = new Koa()
const apiRouter = require('./router/api')

app
  .use(json())
  .use(koaBody())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())
  .use(async ctx => {
    ctx.body = {
      "message": "not found",
      "code": 404
    }
  })

if (process.env.APP_PORT) {
  app.listen(process.env.APP_PORT)
  console.info(" App is listening on:", process.env.APP_PORT)
} else {
  app.listen(3000)
  console.info(" App is listening on: 3000 \n To change app port setup it in dotenv file!")
}