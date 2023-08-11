const express = require("express");
const ErrorHandler = require("./Middlewares/error");
const app = express() 
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors");

app.use(cors())
// app.use(cors({
//     origin: ['https://eshop-tutorial-pyri.vercel.app',],
//     credentials: true
//   }));
  
app.use(express.json())
app.use(cookieParser())
app.use("/",express.static("uploads"))
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));


//config 
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:'backend/config/.env'
    })
}

//importing routes 
const userRoute = require("./controllers/userController.js")

app.use('/api/v2/user', userRoute)


//middlewares
//error handling
app.use(ErrorHandler)
module.exports = app;