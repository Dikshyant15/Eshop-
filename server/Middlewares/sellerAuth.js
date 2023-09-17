const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Shop = require("../models/Shop")

const isSeller = catchAsyncErrors(async(req,res,next)=>{
    const {seller_token} = res.cookies

    if(!seller_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();

})

module.exports = isSeller;
