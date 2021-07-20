const { Task, TaskProgress} = require('../models');
let moment = require('moment');
const { duration } = require('moment');


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
                }
            });
            if (!tasks) {
                try {
                    const tasks = await Task.create({
                        taskName: body.taskName,
                        finished: 0
                    });
                    console.log(tasks.id)
                    const tasksInProgress = await TaskProgress.create({
                        taskID: tasks.id
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
        }
    },
    changeMainTask: async ctx => {
        const body = ctx.request.body;
        if (body.taskID && body.userID){
            const taskInProgress = await TaskProgress.findOne({
                where: {
                    taskID: body.taskID
                }
            });
            if (taskInProgress.userID == body.userID) {
                ctx.status = 409;
                ctx.body = {
                    "message": "task is already in progress",
                    "code": 409
                };
            }
            else {
                if (taskInProgress.userID == null) {
                    let stopTask = await stopPreviousTask(body.userID)

                    if (stopTask) {
                        await taskInProgress.update({
                            userID: body.userID
                        });
                    }

                    ctx.status = 201;
                    ctx.response.body = {
                        "message": "accept",
                        "code": 201
                    }; 
                }
                else{
                    ctx.status = 409;
                    ctx.body = {
                        "message": "task is already occupied",
                        "code": 409
                    };
                }
            }
        }
        else {
            ctx.status = 204;
        }
    },
    endTask: async ctx => {

    },
    getCurrentTask: async ctx => {

    }
}
async function stopPreviousTask (userID) {
    const taskAlreadyInProgress = await TaskProgress.findOne({
        where: {
            userID: userID
        }
    });
    if (taskAlreadyInProgress) {
        let startEditingAt =  moment(taskAlreadyInProgress);
        let diffInSec = moment().diff(startEditingAt, 'seconds');
        if (taskAlreadyInProgress.duration == null) {
            await taskAlreadyInProgress.update({
                userID: null,
                duration: diffInSec
            });
        }
        else {
            await taskAlreadyInProgress.update({
                userID: null,
                duration: (diffInSec + taskAlreadyInProgress.duration)
            });
        }
        return true;
    }
    else {
        return true;
    }
}