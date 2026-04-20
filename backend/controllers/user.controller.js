import {User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import * as z from "zod"; 
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Purchase } from "../models/purchase.model.js";
import { Product } from "../models/product.model.js";
// user sign up 

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userSchema = z.object({
        firstName: z.string().min(3, { message: "First name must be at least 3 characters long" }),
        lastName: z.string().min(3, { message: "Last name must be at least 3 characters long" }),
        email: z.string().email({ message: "Invalid email format" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    });

    const validation = userSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation Error",
            errors: validation.error.issues.map((err) => err.message),
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// user login 

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // ✅ FIRST check user
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            config.JWT_USER_PASSWORD
        );

        res.cookie("jwt", token);

        res.status(200).json({
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// user logout 
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in logout" });
    console.log("Error in logout", error);
  }
}


export const Purchases = async (req, res) => {   
    const userId = req.userId;

    try {
        const purchased = await Purchase.find({ userId });

        const purchasedProductIds = purchased.map(p => p.productId);

        const productData = await Product.find({
            _id: { $in: purchasedProductIds }
        });

        res.status(200).json({
            message: "Purchases fetched successfully",
            purchased,
            productData
        });

    } catch (error) {
        console.log("Purchase Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

