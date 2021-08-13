const { Product } = require("../models");

class ProductController {
  static async getAll(req, res, next) {
    try {
      let productList = await Product.findAll();
      res.status(200).json(productList);
    } catch (error) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    let id = +req.params.id;
    // console.log(id, "<<<");
    try {
      let product = await Product.findOne({ where: { id } });
      //   if (product) {
      //     res.status(200).json(product);
      //   } else {
      //     throw {
      //       name: "myError",
      //       status: 404,
      //       message: "product not found!",
      //     };
      //   }
      res.status(200).json(product);
    } catch (error) {
      next(err);
    }
  }
}

module.exports = ProductController;
