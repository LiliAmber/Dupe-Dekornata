const router = require("express").Router();
const TransactionController = require("../controllers/transactionController");
const authentication = require("../middleware/authentication");

router.use(authentication);

router.post("/", TransactionController.createTransaction);
router.get("/", TransactionController.getAllTransaction);
router.patch("/:id/status", TransactionController.patchStatus);
router.delete("/:id/delete", TransactionController.deleteUserTrans);

router.post("/details", TransactionController.createTransDetail);
module.exports = router;
