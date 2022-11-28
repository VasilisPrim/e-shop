const db = require("../data/database");
const mongodb = require("mongodb");
const Product = require("./product");

class Cart {
  constructor(items = [],totalPrice = 0,numberOfItems = 0) {
    this.items = items
    this.totalPrice = totalPrice;
    this.numberOfItems = numberOfItems
}


  async updatePrices() {
    const productIds = this.items.map(function (item) {
      return item.product.id;
    });
    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
        const product = products.find(function (prod) {
        return prod.id === cartItem.product.id;
      });

      if (!product) {
        // product was deleted!
        // "schedule" for removal from cart
        eletableCartItemProductIds.push(cartItem.product.id);
          ontinue;
          }

      // product was not deleted
      //set product data and total price to latest price from database
      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
        }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(function (item) {
        return deletableCartItemProductIds.indexOf(item.product.id) < 0;
      });
    }

    //re-calculate cart totals
    this.numberOfItems = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.numberOfItems = this.numberOfItems + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  
  }


addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for(let i=0;i<this.items.length;i++){
      const item = this.items[i];
      if(item.product.id === product.id){
        cartItem.quantity  = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.numberOfItems++;
        this.totalPrice += product.price;
        return;
      }

    }
    this.items.push(cartItem);
    this.numberOfItems++;
    this.totalPrice += product.price;

}


updateItem(productId,newQuantity){

  for (let i =0;i<this.items.length;i++){
    const item = this.items[i];
    if (item.product.id === productId && newQuantity > 0) {
      const cartItem = { ...item };
      const quantityChange = newQuantity - item.quantity;
      cartItem.quantity = newQuantity;
      cartItem.totalPrice = item.product.price * newQuantity;
      this.items[i] = cartItem;

      this.numberOfItems = this.numberOfItems + quantityChange;
      this.totalPrice += quantityChange * item.product.price;
      return { updatedItemPrice: cartItem.totalPrice };
    }
    else if (item.product.id === productId && newQuantity <= 0) {
      this.items.splice(i, 1); // to i deixnei apo pou tha arxisoun oi allages kai to 1 ta stoixeia pou tha diagrafoun arxizodas apo th thesi i
      this.numberOfItems = this.numberOfItems - item.quantity;
      this.totalPrice -= item.totalPrice;
      return { updatedItemPrice: 0 };
    }

  }
}
}


module.exports = Cart;