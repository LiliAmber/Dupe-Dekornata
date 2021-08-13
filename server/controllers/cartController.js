const { Cart, Product } = require("../models");

class CartController {
  static async createCart(req, res, next) {
    try {
      let ProductId = +req.body.ProductId;

      //==cek cart user==
      const custData = await Cart.findOne({
        where: { CustomerId: req.user.id, ProductId },
        include: {
          model: Product,
        },
      });
      // console.log(custData, "<<<cust");
      //==cek stock==
      const availableStock = await Product.findOne({
        where: { id: ProductId },
      });
      // console.log(availableStock, "<<<stock");
      let stock = availableStock ? availableStock.quantity : 0;
      if (custData) {
        if (stock >= custData.quantity) {
          let updateQty = await Cart.increment("quantity", {
            where: { CustomerId: req.user.id, ProductId },
          });
          res.status(200).json(updateQty[0][0][0]);
        } else {
          throw {
            name: "myError",
            status: 400,
            message: "stock nya kurang",
          };
        }
      } else {
        //==kalo cart nya belom ada, default qty 1==
        const newCart = await Cart.create({
          CustomerId: req.user.id,
          ProductId,
          quantity: 1,
        });
        res.status(201).json(newCart);
      }
    } catch (err) {
      console.log(err, "<<<err");
      next(err);
    }
  }

  static async getUserCart(req, res, next) {
    try {
      let custCart = await Cart.findAll({
        where: { CustomerId: req.user.id },
        include: {
          model: Product,
        },
      });
      res.status(200).json(custCart);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserCart(req, res, next) {
    let id = req.params.id;
    try {
      let delCart = await Cart.destroy({ where: { id } });
      res.status(200).json({ message: "cart deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async patchQty(req, res, next) {
    const id = req.params.id;
    // console.log(id);

    let quantity = +req.body.quantity;
    try {
      //==cek stock => prop.dri product==
      const availProduct = await Cart.findOne({
        where: { id },
        include: {
          model: Product,
        },
      });
      let stock = availProduct ? availProduct.Product.quantity : 0;

      if (stock >= quantity) {
        // console.log(stock, "<<<stok");
        const newQty = await Cart.update(
          { quantity },
          {
            where: { id },
            returning: true,
          }
        );

        res.status(200).json(newQty[1][0]);
      } else {
        throw {
          name: "myError",
          status: 400,
          message: "stock nya kurang",
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;
