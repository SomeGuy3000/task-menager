'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TaskProgress.init({
    taskID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TaskProgress',
  });
  return TaskProgress;
};