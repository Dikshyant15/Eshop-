const express = require("express")
const path = require("path")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { upload } = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const {isSeller} = require("../Middlewares/sellerAuth")
const {isAuthenticated} = require("../Middlewares/auth")
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Shop = require("../models/Shop")
const sendMail = require("../utils/sendMail")
const sendShopToken = require("../utils/sendShopToken")
const fs = require("fs")

router.post("/create-shop", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/$(filename)`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
            }
        })

        return next(new ErrorHandler("User already exists", 400))
    }

    const filename = req.file.filename
    const fileUrl = path.join(filename)
  
      const seller = {
        name: req.body.name,
        email: email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
        avatar:fileUrl
      };
  
      const activationToken = createActivationToken(seller);
  
      const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`
  
      try {
        await sendMail({
          email: seller.email,
          subject: "Activate your Shop",
          message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${seller.email} to activate your shop!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }));
  
  // create activation token
  const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };
  
  // activate user
  router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
  
        const newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newSeller) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar, zipCode, address, phoneNumber } =
          newSeller;
  
        let seller = await Shop.findOne({ email });
  
        if (seller) {
          return next(new ErrorHandler("Seller already exists", 400));
        }
  
        seller = await Shop.create({
          name,
          email,
          avatar,
          password,
          zipCode,
          address,
          phoneNumber,
        });
        console.log(seller)
  
        sendShopToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

//login seller account
  router.post(
    "/shop-login",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(new ErrorHandler("Please provide the all fields!", 400));
            }

            const seller = await Shop.findOne({ email }).select("+password");

            if (!seller) {
                return next(new ErrorHandler("Seller doesn't exists!", 400));
            }

            const isPasswordValid = await seller.comparePassword(password);

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler("Please provide the correct information", 400)
                );
            }

            sendShopToken(seller, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);
  module.exports = router
  

