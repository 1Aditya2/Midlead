
const Products = require("../Models/Products");
const { success, error } = require("../Utils/resWrapper");
const cloudinary = require("cloudinary").v2;
const getProducts = async (req, res) => {
  //will fetch all the products from the database
  try {
    const allProducts = await Products.find();
    return res.send(success(200, allProducts));
  } catch (e) {
    // console.log(e);
    return res.send(error(500, e.message));
  }
};
const removeFromCart = async (req, res) => {
  //decreases the quantity of product send from frontend
  try {
    const { id } = req.body;
    const product = await Products.findById(id);
    if (product) {
      if (product.quantity > 0) {
        product.quantity -= 1;
      }
      await product.save();
    }

    return res.send(success(200, product));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const addToCart = async (req, res) => {
  //increases the quantity of product 
  try {
    const { id } = req.body;
    const product = await Products.findById(id);
    // console.log(product);
    if (product) {
      product.quantity += 1;
      await product.save();
    }

    return res.send(success(200, product));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const getCart = async (req, res) => {
  //fetches all the products from database having quantity>0
  try {
    const cartProducts = await Products.find({ quantity: { $gt: 0 } });
    // console.log(cartProducts);
    return res.send(success(200, cartProducts));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const removeCartItem = async (req, res) => {
  //sets the quantity of product to 0
  try {
    const { id } = req.body;
    const product = await Products.findById(id);
    if (product) {
      product.quantity = 0;
      await product.save();
    }

    return res.send(success(200, product));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  getProducts,
  removeFromCart,
  addToCart,
  getCart,
  removeCartItem,
};
