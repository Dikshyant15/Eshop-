const express = require("express")
const router = express.Router()
const { upload } = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Shop = require("../models/Shop")
const CouponCode = require("../models/CouponCode");
const { isSeller, isAuthenticated } = require("../Middlewares/auth");

router.post("/create-new-couponCode",isSeller,catchAsyncErrors(async(req,res,next)=>{
    try {
        const isCoupounCodeExists = await CouponCode.find({name:req.body.name})
    
        if (isCoupounCodeExists.length !== 0) {
            return next(new ErrorHandler("Coupoun code already exists!", 400));
          }

        const newCouponCode = await CouponCode.create(req.body)
        res.status(201).json({
            success: true,
            message:"Coupon Code created succesfully",
            newCouponCode,
          });
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  

    }
}))


router.get("/get-couponCode/:sellerId",isSeller,catchAsyncErrors(async(req,res,next)=>{
    try {
        const couponCodeBySellerId = await CouponCode.find({id:req.params.sellerId})

        res.status(201).json({
            success: true,
            couponCodeBySellerId,
          });
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  

    }
}))

router.delete("/delete-couponCode-id/:couponId",isSeller,catchAsyncErrors(async(req,res,next)=>{
    try {
        const couponCodeBySellerId = await CouponCode.findOneAndDelete({id:req.params.couponId})

        res.status(201).json({
            success: true,
            message:"Coupon code sucessfully deleted"
          });
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  

    }
}))
router.get("/get-coupon-code-name/:couponName",catchAsyncErrors(async(req,res,next)=>{
    try {
        console.log(req.params.couponName)
        const couponCode = await CouponCode.findOne({name:req.params.couponName})
        console.log(couponCode)

        res.status(201).json({
            success: true,
            couponCode
          });
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  

    }
}))

module.exports = router