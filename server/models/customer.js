"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/password_helper");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Product, { through: "Cart" });

      Customer.hasMany(models.Cart);
    }
  }
  Customer.init(
    {
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 12],
            msg: "password character length between 6 to 12 characters",
          },
          notEmpty: {
            msg: "password cant be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "invalid email format",
          },
          notEmpty: {
            msg: "email required",
          },
        },
      },
      username: DataTypes.STRING,
      full_name: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
      hooks: {
        beforeCreate: (customer) => {
          customer.password = hashPassword(customer.password);
        },
      },
    }
  );
  return Customer;
};
