const Task = require('../models/task')

module.exports = {
    getAllTasks: async ctx => {
        const tasks = await Task.findAll();
    },
    createTask: async ctx => {
        let body = ctx.request.body;
        const tasks = await Task.create({
            taskName: body.taskName,
            finished: false
          });
    }
}