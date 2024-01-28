const express = require("express");
const router = express.Router()
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler")
const Order = require("../models/Order")
const Shop = require("../models/Shop");
const Product = require("../models/Products");



// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shipingAddress, user, totalPrice, paymentInfo } = req.body;
      //creating a dictionary like data structure 
      const shopItemsMap = new Map()

      //iterating in cart array as it has products of different company 
      for (const item of cart) {
        const shopId = item.shopId
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, [])
        }
        shopItemsMap.get(shopId).push(item)
      }
      //creating order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress: shipingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all shop order
router.get("/get-shop-orders/:shopId", catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.params.shopId
    const orders = await Order.find({ "cart.shopId": shopId })
    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

}))
module.exports = router