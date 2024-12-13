const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async()=>{
    try{
       const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,       // Use new URL parser
        useUnifiedTopology: true,    // Use new Server Discovery and Monitoring engine
        serverSelectionTimeoutMS: 5000, // Timeout after 5s if cannot connect
        socketTimeoutMS: 45000,      // Close sockets after 45 seconds of inactivity
        family: 4,
        });
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;