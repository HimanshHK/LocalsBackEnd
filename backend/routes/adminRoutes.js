const router = require("express").Router();

const authController = require("../controller/adminController");

// POST Routes
router.post("/block-user", authController.postBlockUser)

module.exports = router;
