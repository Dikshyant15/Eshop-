const express = require("express")
const router = express.Router()
const {upload} = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Shop = require("../models/Shop")
const Event = require("../models/Events")


router.post("/create-event",upload.array("images"),catchAsyncErrors(async(req,res,next)=>{
    try {
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if(!shop){return next(new ErrorHandler("Shop is invalid", 400)) }

        const files = req.files
        // console.log(files)
        const imageURLs = files.map((file)=>`${file.filename}`)

        const eventData = req.body
        eventData.images = imageURLs
        eventData.shop = shop
        const newEventData = {
            eventName: eventData.name ,
            description:eventData.description ,
            tags: eventData.tags,
            originalPrice:eventData.price ,
            discountPrice: eventData.dPrice,
            stock: eventData.stock,
            category: eventData.category,
            shop: eventData.shop,
            shopId:  eventData.shopId,
            start_Date:eventData.startDate,
            finish_Date:eventData.endDate,
            images: eventData.images
        }
        const event = await Event.create(newEventData)
        res.status(200).json({success:true,message:"event created",event})
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));

    }
}))

//load all events of a shop
router.get("/get-shop-events/:id",catchAsyncErrors(async(req,res,next)=>{
    try {
        const shopId = req.params.id
        const events = await Event.find({shopId:shopId})

        res.status(200).json({success:true,events})
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));

        
    }
}))
//get all events registered 
router.get("/get-all-events",catchAsyncErrors(async(req,res,next)=>{
    try {
        const allEvents = await Event.find()

        res.status(200).json({success:true,allEvents})
        console.log(allEvents)
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));

        
    }
}))

//for admin -get all events 
router.get("/admin-get-all-events",catchAsyncErrors(async(req,res,next)=>{
    try {
        const adminAllEvents = await Event.find()
        res.status(200).json({sucess:true, adminAllEvents})
        
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
        
    }
   
}))
module.exports = router