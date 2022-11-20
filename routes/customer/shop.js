const express = require('express');

const shopControllers = require('../../controllers/shop-controller');
const router = express.Router();

router.get('/products',shopControllers.products)





module.exports = router;