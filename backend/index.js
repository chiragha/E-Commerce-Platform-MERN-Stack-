import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import addressRoute from "./routes/address.route.js";
import paymentRoute from "./routes/payment.route.js";
import { Server } from "socket.io";
import cartRoute from "./routes/cart.route.js";
import userRoutes from "./routes/user.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("CONNECTED TO MONGODB");
} catch (error) {
  console.error("MongoDB Error:", error.message);
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/cart", cartRoute);


const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

export { io };
