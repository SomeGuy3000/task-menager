const KoaRouter = require('koa-router');
const api = new KoaRouter({ prefix: '/api' });

const taskController = require('../controllers/task');

api.get('/tasks', (ctx) => taskController.getAllTasks(ctx));
api.post('/task', (ctx) => taskController.createTask(ctx));


module.exports = api;