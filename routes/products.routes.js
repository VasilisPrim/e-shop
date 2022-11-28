
const express = require("express");


const productsController = require("../controllers/product-controller");

const router = express.Router();


router.get("/products",productsController.products)

router.get('/products/:id',productsController.productDetails)


module.exports = router

