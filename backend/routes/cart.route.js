import express from "express";

import { addToCart, getCart ,removeFromCart,updateCartQuantity } from "../controllers/cart.controller.js";

import userAuthenticateToken from "../middlewares/user.mid.js";

const router = express.Router();

router.post("/add", userAuthenticateToken, addToCart);

router.get("/get", userAuthenticateToken, getCart);

router.delete("/remove", userAuthenticateToken, removeFromCart);

router.put("/update", userAuthenticateToken, updateCartQuantity);

export default router;
