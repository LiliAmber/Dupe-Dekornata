const router = require("express").Router();
const ProductController = require("../controllers/productController");

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getProductById);

module.exports = router;
