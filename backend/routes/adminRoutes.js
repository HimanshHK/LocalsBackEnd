const router = require("express").Router();

const authController = require("../controller/adminController");

// POST Routes
router.post("/block-user", authController.postBlockUser)
router.post("/unblock-user", authController.postUnblockUser)
module.exports = router;
