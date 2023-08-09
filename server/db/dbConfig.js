const mongoose = require("mongoose")

const connectDatabase =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data)=>{
        console.log(`mongodb connected successfully with server:${data.connection.host}`)
    })
}
module.exports = connectDatabase