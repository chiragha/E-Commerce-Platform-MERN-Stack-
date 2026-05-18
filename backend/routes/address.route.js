import express from "express";
import userAuthenticateToken from "../middlewares/user.mid.js";

import {
  saveAddress,
  getAddresses,
  deleteAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/save", userAuthenticateToken, saveAddress);

router.get("/all", userAuthenticateToken, getAddresses);

router.delete("/delete/:addressId", userAuthenticateToken, deleteAddress);

export default router;
