const { Cart } = require("../models");

async function authorizationCust(req, res, next) {
  const id = req.params.id;
  try {
    if (id) {
      console.log("masukk authorisasi");
      let custCart = await Cart.findOne({ where: { id } });
      if (custCart) {
        console.log(custCart, "<<<data author");
        if (custCart.UserId === req.user.id) {
          next();
          // next();
        } else {
          throw {
            name: "myError",
            status: 403,
            message:
              "Not authorized ! you dont have permission to access this data",
          };
        }
      } else {
        throw {
          name: "myError",
          status: 404,
          message: "cart not found",
        };
      }
    }
  } catch (err) {
    console.log(err, "<<<err autor");
    next(err);
  }
}

module.exports = authorizationCust;
