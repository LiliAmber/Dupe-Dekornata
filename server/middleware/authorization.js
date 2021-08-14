const { Cart } = require("../models");

async function authorizationCust(req, res, next) {
  const id = req.params.id;
  try {
    if (id) {
      let custCart = await Cart.findOne({ where: { id } });
      if (custCart) {
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
    next(err);
  }
}

module.exports = authorizationCust;
