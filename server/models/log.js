"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Log.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Log.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required" },
        },
      },
      goods: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      type: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Total is required" },
          isInt: { msg: "Total must be an integer" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
          isInt: { msg: "User ID must be an integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "Log",
    }
  );
  return Log;
};
