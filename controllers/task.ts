import Koa from "koa";
const taskServices = require("../services/task/taskServices");

module.exports = {
  getAllTasks: async (ctx: Koa.ParameterizedContext) => {
    const res = await taskServices.getAllTasks();
    ctx.response.body = res;
    ctx.status = res.code;
  },
  getCurrentTask: async (ctx: Koa.ParameterizedContext) => {
    const userID = ctx.request.query.userID;
    if (userID) {
      const res = await taskServices.getCurrentTask(userID);
      ctx.response.body = res;
      ctx.status = res.code;
    } else {
      ctx.status = 204;
    }
  },
  createNewTask: async (ctx: Koa.ParameterizedContext) => {
    const taskName = ctx.request.body.taskName;
    if (taskName) {
      const res = await taskServices.createNewTask(taskName);
      ctx.response.body = res;
      ctx.status = res.code;
    } else {
      ctx.status = 204;
    }
  },
  changeMainTask: async (ctx: Koa.ParameterizedContext) => {
    const taskID = ctx.request.body.taskID;
    const userID = ctx.request.body.userID;
    if (taskID && userID) {
      const res = await taskServices.changeMainTask(taskID, userID);
      ctx.response.body = res;
      ctx.status = res.code;
    } else {
      ctx.status = 204;
    }
  },
  endTask: async (ctx: Koa.ParameterizedContext) => {
    const taskID = ctx.request.query.taskID;
    if (taskID) {
      const res = await taskServices.endTask(taskID);
      ctx.response.body = res;
      ctx.status = res.code;
    } else {
      ctx.status = 204;
    }
  },
};
