const { Customer } = require("../models");
const { comparePassword } = require("../helper/password_helper");
const { sign } = require("../helper/token_helper");

class UserController {
  static async signup(req, res, next) {
    let { email, password, username, full_name, address } = req.body;
    try {
      let data = await Customer.create({
        email,
        password,
        username,
        full_name,
        address,
      });
      res.status(201).json({
        data: {
          id: data.id,
          email: data.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async signin(req, res, next) {
    try {
      if (!req.body.email && !req.body.password) {
        throw {
          name: "myError",
          status: 400,
          message: "email or password can't be empty",
        };
      } else {
        let { email, password } = req.body;

        let isSignIn = await Customer.findOne({ where: { email } });
        if (isSignIn) {
          let isPassword = comparePassword(password, isSignIn.password);

          //KALO PASSWORD INVALID
          if (!isPassword) {
            throw {
              name: "myError",
              status: 400,
              message: "invalid email or password",
            };
          } else {
            let payload = sign({
              id: isSignIn.id,
              email: isSignIn.email,
              address: isSignIn.address,
              username: isSignIn.username,
            });

            res.status(200).json({
              id: isSignIn.id,
              email: isSignIn.email,
              address: isSignIn.address,
              username: isSignIn.username,
              access_token: payload,
            });
          }
        } else {
          throw {
            name: "myError",
            status: 400,
            message: "invalid email or password",
          };
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
