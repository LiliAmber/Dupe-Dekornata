const { Customer } = require("../models");
const { verify } = require("../helper/token_helper");

async function authentication(req, res, next) {
  const payload = req.headers.access_token;
  try {
    if (!payload) {
      throw {
        name: "myError",
        status: 403,
        message: "please sign in to your account!",
      };
    } else {
      const decoded = verify(payload);
      const foundUser = await Customer.findByPk(decoded.id);
      if (foundUser) {
        req.user = decoded;
        next();
      } else {
        throw {
          name: "myError",
          status: 400,
          message: "invalid access token!",
        };
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
