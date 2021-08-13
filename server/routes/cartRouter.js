const router = require("express").Router();
const CartController = require("../controllers/cartController");
const authentication = require("../middleware/authentication");
const authorizationCust = require("../middleware/authentication");

router.use(authentication);

router.post("/", CartController.createCart);
router.get("/", CartController.getUserCart);

router.use("/:id", authorizationCust);
router.patch("/:id/editQty", CartController.patchQty);
router.delete("/:id/delete", CartController.deleteUserCart);
module.exports = router;
