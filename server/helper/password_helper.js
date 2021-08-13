const bcrypt = require("bcrypt");

function hashPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(plainPassword, salt);
}

function comparePassword(plainPassword, encryptedPassword) {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
}
module.exports = { hashPassword, comparePassword };
