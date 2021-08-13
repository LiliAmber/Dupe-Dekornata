const {
  Cart,
  Product,
  Customer,
  Transaction,
  Transaction_Detail,
} = require("../models");

class TransactionController {
  static async getAllTransaction(req, res, next) {
    try {
      let data = await Transaction.findAll({
        include: {
          model: Cart,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createTransaction(req, res, next) {
    let CartId = +req.body.CartId;
    // console.log(CartId, "<<<body");
    try {
      let custCart = await Cart.findByPk(CartId, {
        include: {
          model: Product,
        },
      });
      let total_price = custCart.Product.price * custCart.quantity;
      let todayDate = new Date().toISOString().slice(0, 10);
      let randomDigit = Math.floor(100000 + Math.random() * 900000);
      let userCart = {
        total_price,
        total_amount: custCart.quantity,
        //INVOICE/{YYYYMMDD}/DEKORNATA/{RANDOM 6 DIGIT}
        invoice_number: `INVOICE/${todayDate}/DEKORNATA/${randomDigit}`,
      };
      let newTrans = await Transaction.create(userCart);
      res.status(201).json(newTrans);
      //   res.status(201).json(custCart);
    } catch (err) {
      console.log(err, "<<<err");
      next(err);
    }
  }

  static async patchStatus(req, res, next) {
    let newStats = req.body.status;
    let id = +req.params.id;
    try {
      let updtStatus = await Transaction.update(
        { status: newStats },
        { where: { id }, returning: true }
      );
      res.status(200).json(updtStatus[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserTrans(req, res, next) {
    let id = +req.params.id;
    console.log(id, "<<id");
    try {
      let delTrans = await Transaction.destroy({ where: { id } });
      res.status(200).json({ message: "transaction deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async createTransDetail(req, res, next) {
    let TransactionId = +req.body.TransactionId;
    let CartId = +req.body.CartId;
    console.log(TransactionId, "<<id");
    try {
      let data = {
        TransactionId,
        CartId,
      };
      let newDetail = await Transaction_Detail.create(data);
      res.status(201).json(newDetail);
    } catch (err) {
      console.log(err, "<<err");
      next(err);
    }
  }
}

module.exports = TransactionController;
