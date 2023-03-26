const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const productController = require("../controller/productController");

// GET Routes
router.get("/products", productController.getProducts);
  
router.get("/products/:id", productController.getProduct);

// POST Routes
router.post("/product", [
    check('name').notEmpty(),
    check('price').isNumeric(),
    check('description').notEmpty(),
    check('image').notEmpty(),
    check('category').notEmpty(),
    check('company').notEmpty(),
    check('stock').isNumeric(),
  ], productController.postProduct);

module.exports = router;
