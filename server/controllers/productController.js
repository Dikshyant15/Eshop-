const express = require("express")
const router = express.Router()
const {upload} = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Product = require("../models/Proucts")


router.post("/create-product",upload.array("files",3),catchAsyncErrors(async(req,res,next)=>{
    try {
        res.status(200).json({success:true,message:"Product created"})
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));

    }



}))
module.exports = router 
