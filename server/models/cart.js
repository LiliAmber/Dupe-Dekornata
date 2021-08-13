"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.Customer);

      //==cart, transaction, transactionDetails==
      Cart.belongsToMany(models.Transaction, { through: "Transaction_Detail" });
      Cart.hasMany(models.Transaction_Detail);
    }
  }
  Cart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      CustomerId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0, //belom cekout
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
