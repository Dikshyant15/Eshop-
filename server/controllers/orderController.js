const express = require("express");
const router = express.Router()
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler")
const { isSeller, isAdmin, isAuthenticated } = require("../Middlewares/auth")
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

//get all latest shop order
router.get("/get-latest-order-shop/:shopId", catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.params.shopId
    const latestOrders = await Order.find({ "cart.shopId": shopId }).sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      latestOrders,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}))


//get all user order
router.get("/get-user-orders/:userId", catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.params.userId
    const orders = await Order.find({ "user._id": userId })
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}))

router.put("/update-order-status/:orderId", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findById(orderId)
    if (!order) {
      return next(new ErrorHandler("Order not available", 400));
    }

    // if status is transferred to delivery partner 
    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async (o) => {
        const orderID = o._id
        // console.log(orderID)
        const qty = o.qty
        // console.log(qty)
        await updateProductCount(orderID, qty);
      })
    }
    if (order.status === "Delivered") {
      order.deliveredAt = Date.now()
      order.paymentInfo.status = "Payment Succeded"
      //for updating seller info 
      const serviceCharge = order.totalPrice * 0.1
      
      console.log(serviceCharge)
      const availablePriceAfterServiceCharge = order.totalPrice - serviceCharge
      console.log(availablePriceAfterServiceCharge)
      await updateSellerInfo(availablePriceAfterServiceCharge)
    }
    order.status = req.body.status //not saved in the database 
    res.status(200).json({
      success: true,
      order,
    });

    // update user order status
    async function updateProductCount(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    //update seller info 
    async function updateSellerInfo(amount) {
      const shop = await Shop.findById(req.seller.id)
      shop.availableBalance += amount
      await shop.save()

    }
    await order.save({ validateBeforeSave: false })
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

//admin get all orders
router.get("/admin-get-all-order",isAuthenticated,isAdmin("Admin"),catchAsyncErrors(async(req,res,next)=>{
  try {
    const allOrders = await Order.find().sort({createdAt:-1})
    res.status(200).json({
      success: true,
      allOrders,
    });
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
  
}))


module.exports = router