
const Product = require("../models/product");





async function products(req,res,next){
    
    try {
        
        const products = await Product.findAll()
        
        res.render('customer/products/products',{products:products});
    }
    catch (error) {
        next(error)
    }
}


async function productDetails(req,res,next){

    try {
        const product = await Product.findById(req.params.id);
        res.render('customer/products/product-details',{product:product})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    products:products,
    productDetails:productDetails
}