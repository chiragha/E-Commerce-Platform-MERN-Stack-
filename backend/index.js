import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config()



const app = express()
const port = process.env.PORT || 3000
// Add this line
app.use("/uploads", express.static("uploads"));
// middleware 
app.use(express.json())

app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const DB_URI = process.env.MONGO_URI


const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-platform-mern-stack-pi.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://e-commerce-platform-mern-stack-pi.vercel.app"
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

try {
  await mongoose.connect(DB_URI)
  console.log("CONNECTED TO MONGOOSE")
} catch (error) {
console.log(error)
}



// routes 
app.use("/api/v1/product" , productRoute);

//user route
app.use("/api/v1/user" , userRoute);

// admin route 
app.use("/api/v1/admin" , adminRoute);


// Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret 
    });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
