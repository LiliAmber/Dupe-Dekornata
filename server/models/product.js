"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Customer, { through: "Cart" });
      Product.hasMany(models.Cart);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.ARRAY(DataTypes.STRING),
      quantity: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      dimension: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      material: DataTypes.STRING,
      finishing: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
