const KoaRouter = require('koa-router');
const api = new KoaRouter({ prefix: '/api' });

const taskController = require('../controllers/task');

api.get('/tasks', (ctx) => taskController.getAllTasks(ctx));
api.get('/task', (ctx) => taskController.getCurrentTask(ctx));
api.post('/task', (ctx) => taskController.createNewTask(ctx));
api.put('/task', (ctx) => taskController.changeMainTask(ctx));
api.delete('/task', (ctx) => taskController.endTask(ctx));

module.exports = api;