const KoaRouter = require('koa-router');
const api = new KoaRouter({ prefix: '/api' });

let taskController = require('../controllers/task')

api.get('/tasks', (ctx) => taskController.getAllTasks(ctx));
module.exports = api;