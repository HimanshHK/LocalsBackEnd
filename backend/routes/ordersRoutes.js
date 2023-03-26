const router = require("express").Router();
// const { check, validationResult } = require('express-validator');
// const uploads = require("../middlewares/uploads");
const ordersController = require("../controller/ordersController");

// GET Routes
router.get("/orders", ordersController.getOrders);

// POST Routes
router.post("/orders",ordersController.postOrders);

// router.post("/orders", uploads.imageUpload.single("profile-pic"), userController.postRegister);

module.exports = router;
