const router = require("express").Router();
module.exports = router;

router.use("/users", require("./User"));
router.use("/auth", require("./Auth"));
router.use("/transactions", require("./Transaction"));
