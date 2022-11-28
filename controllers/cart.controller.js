const Product = require("../models/product");


function getCart(req, res) {
  res.render("customer/cart/cart");
}

async function addCartItem(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.body.productId)

    } catch (error) {
        next(error);
        return;
    }


    const cart = res.locals.cart;

    cart.addItem(product);
    
    req.session.cart = cart;

    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.numberOfItems
    })

}


function updateCartItem(req,res,next){
    
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(req.body.productId,req.body.quantity)

    req.session.cart = cart;


    res.json({
      message: "Item updated!",
      updatedCartData: {
        newTotalQuantity: cart.numberOfItems,
        newTotalPrice: cart.totalPrice,
        updatedItemPrice: updatedItemData.updatedItemPrice,
      },
    });
}

module.exports = {
  addCartItem: addCartItem,
  getCart:getCart,
  updateCartItem:updateCartItem
};
