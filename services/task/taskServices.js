const moment = require("moment");
const { Task, TaskProgress } = require("../../models");
const responseBuilder = require("../../middleware/responseBuilder");

module.exports = {
  getAllTasks: async () => {
    let allTasks = await Task.findAll();
    if (allTasks) {
      return responseBuilder("ok", 200, allTasks);
    }
    return responseBuilder("error", 500);
  },
  getCurrentTask: async (userID) => {
    const taskInProgress = await TaskProgress.findOne({
      where: {
        userID: userID,
      },
    });
    if (taskInProgress && taskInProgress.taskID) {
      const currentTask = await Task.findOne({
        where: {
          id: taskInProgress.taskID,
        },
      });
      if (currentTask) {
        return responseBuilder("ok", 200, currentTask);
      }
      return responseBuilder("error", 500);
    }
    return responseBuilder("ok", 200, []);
  },
  createNewTask: async (taskName) => {
    const tasks = await Task.findOne({
      where: {
        taskName: taskName,
      },
    });
    if (!tasks) {
      const createdTasks = await Task.create({
        taskName: taskName,
        finished: 0,
      });
      if (createdTasks) {
        const tasksInProgress = await TaskProgress.create({
          taskID: createdTasks.id,
        });
        if (tasksInProgress) {
          return responseBuilder("accept", 201);
        } else {
          return responseBuilder("error", 500);
        }
      } else {
        return responseBuilder("error", 500);
      }
    } else if (tasks) {
      return responseBuilder("element aleady exist", 409);
    } else {
      return responseBuilder("error", 500);
    }
  },
  changeMainTask: async (taskID, userID) => {
    const taskInProgress = await TaskProgress.findOne({
      where: {
        taskID: taskID,
      },
    });
    if (taskInProgress) {
      if (taskInProgress.userID == userID) {
        return responseBuilder("task is already in progress", 409);
      } else {
        if (taskInProgress.userID == null) {
          let stopTask = await stopPreviousTask(userID);
          if (stopTask) {
            await taskInProgress.update({
              userID: userID,
            });
            return responseBuilder("accept", 201);
          } else {
            return responseBuilder("error", 500);
          }
        } else {
          return responseBuilder("task is already occupied", 409);
        }
      }
    } else {
      return responseBuilder("task not found", 409);
    }
  },
  endTask: async (taskID) => {
    const taskProgress = await TaskProgress.findOne({
      where: {
        taskID: taskID,
      },
    });
    if (taskProgress) {
      await taskProgress.destroy();
      const task = await Task.findOne({
        where: {
          id: taskID,
        },
      });
      if (task) {
        await task.destroy();
        return responseBuilder("ok", 200);
      } else {
        return responseBuilder("error", 500);
      }
    } else {
      return responseBuilder("error", 500);
    }
  },
};

async function stopPreviousTask(userID) {
  const taskAlreadyInProgress = await TaskProgress.findOne({
    where: {
      userID: userID,
    },
  });
  if (taskAlreadyInProgress) {
    let diffInSec = moment().diff(moment(taskAlreadyInProgress), "seconds");
    if (taskAlreadyInProgress.duration != null) {
      diffInSec = diffInSec + taskAlreadyInProgress.duration;
    }
    await taskAlreadyInProgress.update({
      userID: null,
      duration: diffInSec,
    });
    return true;
  } 
  return false;
}
