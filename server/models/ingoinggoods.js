"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IngoingGoods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IngoingGoods.belongsTo(models.User, { foreignKey: "userId" });
      IngoingGoods.belongsTo(models.Good, { foreignKey: "goodId" });
    }
  }
  IngoingGoods.init(
    {
      description: DataTypes.STRING,
      goodId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      numberOfItems: DataTypes.INTEGER,
      date: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "IngoingGoods",
    }
  );
  return IngoingGoods;
};
