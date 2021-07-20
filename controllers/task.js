const { Task } = require('../models');


module.exports = {
    getAllTasks: async ctx => {
        const tasks = await Task.findAll()
        ctx.status = 200;
        ctx.response.body = {
            "message": "ok",
            "code": 200,
            "data": tasks
        };
    },
    createTask: async ctx => {
        const body = ctx.request.body;
        if (body.taskName){
            const tasks = await Task.findOne({
                where: {
                    taskName: body.taskName
                }});
            if (!tasks) {
                try {
                    const tasks = await Task.create({
                        taskName: body.taskName,
                        finished: 0
                    });
                    ctx.status = 201;
                    ctx.response.body = {
                        "message": "accept",
                        "code": 201
                    };
                }
                catch {
                    ctx.status = 500;
                    ctx.body = {
                        "message": "error",
                        "code": 500
                    };
                }
            }
            else {
                ctx.status = 409;
                ctx.body = {
                    "message": "element aleady exist",
                    "code": 409
                };
            }
        }
        else {
            ctx.status = 204; 
            ctx.response.body = {
                "message": "no content",
                "code": 204
            };
        }
    }
}