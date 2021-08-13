"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_Detail.belongsTo(models.Cart);
      Transaction_Detail.belongsTo(models.Transaction);
    }
  }
  Transaction_Detail.init(
    {
      CartId: DataTypes.INTEGER,
      TransactionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction_Detail",
    }
  );
  return Transaction_Detail;
};
