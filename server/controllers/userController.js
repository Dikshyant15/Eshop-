const express = require("express")
const path = require("path")
const router = express.Router()
const jwt = require("jsonwebtoken")
// const multer = require('multer');
const { upload } = require("../multer")
// const {uploadSingle} = multer({ dest: 'uploads/' });
const ErrorHandler = require("../utils/ErrorHandler")
const { isAuthenticated,isAdmin } = require("../Middlewares/auth")
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

// load user
router.get(
    '/getuser',
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return next(new ErrorHandler("User doesn't exist", 400));
            }

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


//logout 
router.post("/logout", catchAsyncErrors(async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(201).json({
            success: true,
            message: "Log out successful!",
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }

})
)

// update user info
router.put(
    "/update-user-info",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { email, password, phoneNumber, name } = req.body;

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return next(new ErrorHandler("User not found", 400));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler("Please provide the correct information", 400)
                );
            }

            user.name = name;
            user.email = email;
            user.phoneNumber = phoneNumber;

            await user.save();

            res.status(201).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


//change password 
router.put("/update-user-password", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("+password")

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Password doesn't match ", 400));

        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(
                new ErrorHandler("New password doesn't matched with confirm password!", 400)
            );
        }

        user.password = req.body.newPassword
        await user.save()

        res.status(200).json({
            success: true,
            message: "Password updated successfully!",
        });


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));


    }

}))

//update user address information 
router.put(`/update-user-address`,isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
        const userId = req.user.id
        const user = await User.findById(userId)

        const userAddressTypeExists = user.addresses.find((address)=>{
            address.addressType === req.body.addressType
        }) 
        if(userAddressTypeExists){
            return next(
                new ErrorHandler(`${req.body.addressType} address already exists`)
              );
        }
        const userAddressExists = user.addresses.find((address)=>{
            address._id === req.body._id
        }) 

        if(userAddressExists){
            Object.assign(userAddressExists,req.body)
        }else{
            user.addresses.push(req.body);
        }
        await user.save()
        res.status(200).json({
            success: true,
            user,
          });        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  
    }
}))

//delete user address
router.delete("/delete-user-address/:id",isAuthenticated, catchAsyncErrors(async(req,res,next)=>{
    try {
        const userId = req.user._id
        console.log(`lund ${userId}`)
        const addressId = req.params.id
        console.log(`tatti ${addressId}`)
        await User.updateOne(
            {
              _id: userId,
            },
            { $pull: { addresses: { _id: addressId } } }
          );
    
          const user = await User.findById(userId);
    
          res.status(200).json({ success: true, user })
          console.log(user)
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  

    }
}))


//admin get all users
router.get("/admin-get-all-user",isAuthenticated,isAdmin("Admin"), catchAsyncErrors(async (req, res, next) => {
    try {
        const adminAllUser = await User.find()

        res.status(200).json({ success: true, adminAllUser })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));

    }
}))

//admin delete user
router.delete("/delete-user-admin/:id",isAuthenticated,isAdmin("Admin"), catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.params.id
        console.log(userId)
        await User.findByIdAndDelete(userId)

        res.status(200).json({ message: "User deleted successfully", success: true })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));


    }

})
)

//update user--admin address information 
router.put(`/update-user-address`,isAuthenticated,isAdmin("Admin"),catchAsyncErrors(async(req,res,next)=>{
    try {
        const userId = req.user.id
        const user = await User.findById(userId)

        const userAddressTypeExists = user.addresses.find((address)=>{
            address.addressType === req.body.addressType
        }) 
        if(userAddressTypeExists){
            return next(
                new ErrorHandler(`${req.body.addressType} address already exists`)
              );
        }
        const userAddressExists = user.addresses.find((address)=>{
            address._id === req.body._id
        }) 

        if(userAddressExists){
            Object.assign(userAddressExists,req.body)
        }else{
            user.addresses.push(req.body);
        }
        await user.save()
        res.status(200).json({
            success: true,
            user,
          });        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  
    }
}))

//delete user-admin address
router.delete("/delete-user-address/:id",isAuthenticated,isAdmin("Admin"), catchAsyncErrors(async(req,res,next)=>{
    try {
        const userId = req.user._id
        const addressId = req.params.id
        await User.updateOne(
            {
              _id: userId,
            },
            { $pull: { addresses: { _id: addressId } } }
          );
    
          const user = await User.findById(userId);
    
          res.status(200).json({ success: true, user })
          console.log(user)
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));  

    }
}))





module.exports = router;