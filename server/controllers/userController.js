const express = require("express")
const path = require("path")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { upload } = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const User = require("../models/Users")
const sendMail = require("../utils/sendMail")
const sendToken = require("../utils/jwtToken")
const fs = require("fs")

//registering a new user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const userEmail = await User.findOne({ email })

        if (userEmail) {
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

        const user = {
            name: username,
            email: email,
            password: password,
            avatar: fileUrl
        }
        console.log(user)

        // const newUser = await User.create(user)
        // res.status(201).json({ success: true, newUser })

        //create activation token 
        const createActivationToken = (user) => {
            return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" })
        }
        const activationToken = createActivationToken(user)
        const activationUrl = `http://localhost:3000/activation/${activationToken}`

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
            });
            res.status(201).json({
                success: true,
                message: `please check your email:- ${user.email} to activate your account!`,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

//creating a new user 
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = req.body

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET)

        if (!newUser) {
            return new ErrorHandler("Invalid token", 400)
        }

        const { name, email, password, avatar } = newUser;
        let user = await User.findOne({ email })

        if (user) {
            return new ErrorHandler("User already exists", 400)

        }

        user = await User.create({
            name,
            email,
            avatar,
            password,
        });

        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

// login user
router.post(
    "/login-user",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await User.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );






module.exports = router;