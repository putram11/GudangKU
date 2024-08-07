"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Good extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Good.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Good.init(
    {
      name: DataTypes.STRING,
      numberOfItems: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Good",
    }
  );
  return Good;
};
