const router = require("express").Router();
const user = require("./userRouter");
const product = require("./productRouter");
const cart = require("./cartRouter");

router.use("/users", user);
router.use("/products", product);
router.use("/carts", cart);

module.exports = router;
