import express from "express";

import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

import userAuthenticateToken from "../middlewares/user.mid.js";

const router = express.Router();

router.post("/create-order", createOrder);

router.post("/verify-payment", userAuthenticateToken, verifyPayment);

export default router;
