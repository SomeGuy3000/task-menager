import Koa from "koa";
import KoaRouter from "koa-router"

const api = new KoaRouter({ prefix: "/api" });
const taskController = require("../controllers/task");

api.get("/tasks", (ctx: Koa.ParameterizedContext) => taskController.getAllTasks(ctx));
api.get("/task", (ctx: Koa.ParameterizedContext) => taskController.getCurrentTask(ctx));
api.post("/task", (ctx: Koa.ParameterizedContext) => taskController.createNewTask(ctx));
api.put("/task", (ctx: Koa.ParameterizedContext) => taskController.changeMainTask(ctx));
api.delete("/task", (ctx: Koa.ParameterizedContext) => taskController.endTask(ctx));

module.exports = api;
