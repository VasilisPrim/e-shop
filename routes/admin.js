
const express = require("express");

const adminControllers = require('../controllers/admin-controllers');
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get('/products',adminControllers.getProducts);

router.get('/products/new',adminControllers.getNewProduct);

router.post(
  "/products",
  imageUploadMiddleware,
  adminControllers.createNewProduct
);

router.get("/products/:id", adminControllers.getUpdateProduct);

router.post(
  "/products/:id",
  imageUploadMiddleware,
  adminControllers.updateProduct
);


router.delete("/products/:id", adminControllers.deleteProduct);






module.exports = router;