const express = require("express")
const router = express.Router()
const {upload} = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Product = require("../models/Proucts")
const Shop = require("../models/Shop")


router.post("/create-product",upload.array("images"),catchAsyncErrors(async(req,res,next)=>{
    try {
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if(!shop){return next(new ErrorHandler("Shop is invalid", 400)) }

        const files = req.files
        // console.log(files)
        const imageURLs = files.map((file)=>`${file.filename}`)

        const productData = req.body
        productData.images = imageURLs
        productData.shop = shop
        const newproductData = {
            productName: productData.name ,
            description:productData.description ,
            tags: productData.tags,
            originalPrice:productData.price ,
            discountPrice: productData.dPrice,
            stock: productData.stock,
            category: productData.category,
            shop: productData.shop,
            shopId:  productData.shopId,
            images: productData.images
        }
        const product = await Product.create(newproductData)
        res.status(200).json({success:true,message:"Product created",product})
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));

    }



}))
module.exports = router 
