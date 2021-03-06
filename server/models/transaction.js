"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsToMany(models.Cart, { through: "Transaction_Detail" });
      Transaction.hasMany(models.Transaction_Detail);
    }
  }
  Transaction.init(
    {
      status: {
        type: DataTypes.ENUM("pending", "success", "canceled"),
        defaultValue: "pending",
      },
      invoice_number: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
      // Transaction_DetailId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
