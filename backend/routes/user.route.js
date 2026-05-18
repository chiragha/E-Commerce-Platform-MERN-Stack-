import express from "express";
import {
  login,
  logout,
  Purchases,
  signup,
} from "../controllers/user.controller.js";
import userAuthenticateToken from "../middlewares/user.mid.js";
import { getUserOrders } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/purchases", userAuthenticateToken, Purchases);
// GET USER ORDERS
router.get("/orders", userAuthenticateToken, getUserOrders);
export default router;
