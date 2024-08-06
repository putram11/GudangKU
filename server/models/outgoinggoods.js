'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutgoingGoods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OutgoingGoods.belongsTo(models.User, { foreignKey: 'userId' });
      OutgoingGoods.belongsTo(models.Good, { foreignKey: 'goodId' });
    }
  }
  OutgoingGoods.init({
    description: DataTypes.STRING,
    goodId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    numberOfItems: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OutgoingGoods',
  });
  return OutgoingGoods;
};