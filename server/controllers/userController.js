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
      // console.log(err, "<<err");
      next(err);
    }
  }

  static async signin(req, res, next) {
    console.log(req, "<<<body server");
    try {
      if (!req.body.email && !req.body.password) {
        console.log("masukk!1");
        throw {
          name: "myError",
          status: 400,
          message: "email or password can't be empty",
        };
      } else {
        let { email, password } = req.body;
        // console.log(req.body, "<<ini req.body");

        let isSignIn = await Customer.findOne({ where: { email } });
        if (isSignIn) {
          let isPassword = comparePassword(password, isSignIn.password);

          //KALO PASSWORD INVALID
          if (!isPassword) {
            console.log("pass salah");

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
            // console.log(payload, "<<<<payload controller");
            res.status(200).json({
              id: isSignIn.id,
              email: isSignIn.email,
              address: isSignIn.address,
              username: isSignIn.username,
              access_token: payload,
            });
          }
        } else {
          console.log("email salah");

          throw {
            name: "myError",
            status: 400,
            message: "invalid email or password",
          };
        }
      }
    } catch (err) {
      //   console.log(err, "<<errr");
      next(err);
    }
  }
}

module.exports = UserController;
