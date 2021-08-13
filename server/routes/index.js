const router = require("express").Router();
const user = require("./userRouter");
const product = require("./productRouter");
const cart = require("./cartRouter");
const transaction = require("./transactionRouter");

router.use("/users", user);
router.use("/products", product);
router.use("/carts", cart);
router.use("/transactions", transaction);

module.exports = router;
