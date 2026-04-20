import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {
  const adminId = req.adminId;

  try {
    if (!adminId) {
      return res.status(401).json({ error: "Unauthorized admin" });
    }

    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const { image } = req.files;

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/avif",
    ];
    if (!allowedFormats.includes(image.mimetype)) {
      return res.status(400).json({
        error: "Only JPEG, PNG, GIF, and AVIF allowed",
      });
    }

    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    const product = await Product.create({
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
      createdBy: adminId,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Create Product Error:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  const adminId = req.adminId;

  try {
    const { productId } = req.params;
    if (!adminId) {
      return res.status(401).json({ error: "Unauthorized admin" });
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const { title, description, price } = req.body;

    const existingProduct = await Product.findById(productId);
    console.log("Token adminId:", adminId);
    console.log("Product createdBy:", existingProduct.createdBy?.toString());

    if (
      !existingProduct.createdBy ||
      adminId !== existingProduct.createdBy.toString()
    ) {
      return res.status(403).json({
        error: "Access denied. You can only update your own products.",
      });
    }
    // ✅ Safe ownership check
    if (!existingProduct.createdBy.equals(adminId)) {
      return res.status(403).json({
        error: "Access denied. You can only update your own products.",
      });
    }
    console.log("Token adminId:", adminId);
    console.log("Product createdBy:", existingProduct.createdBy?.toString());
    // ✅ Update fields safely
    if (title) existingProduct.title = title;
    if (description) existingProduct.description = description;
    if (price !== undefined) existingProduct.price = price;

    // ✅ Update image
    if (req.files && req.files.image) {
      await cloudinary.uploader.destroy(existingProduct.image.public_id);

      const cloud_response = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
      );

      existingProduct.image = {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      };
    }

    await existingProduct.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.log("Update Product Error:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  const adminId = req.adminId;

  try {
    if (!adminId) {
      return res.status(401).json({ error: "Unauthorized admin" });
    }

    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Safe ownership check
    if (!product.createdBy || adminId !== product.createdBy.toString()) {
      return res.status(403).json({
        error: "Access denied. You can only delete your own products.",
      });
    }

    await cloudinary.uploader.destroy(product.image.public_id);
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Delete Product Error:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "email");

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("Fetch Products Error:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

// ================= GET PRODUCT BY ID =================
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId).populate(
      "createdBy",
      "email",
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log("Fetch Product Error:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
};

// ================= BUY PRODUCT =================
export const buyProduct = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    const { productId } = req.params;

    // ✅ Auth check
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // ✅ Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Check already purchased
    const existingPurchase = await Purchase.findOne({
      userId,
      productId,
    });

    if (existingPurchase) {
      return res.status(200).json({
        message: "You already purchased this product",
        alreadyPurchased: true,
      });
    }

    // ✅ Create purchase
    const purchase = await Purchase.create({
      userId,
      productId,
    });

    return res.status(201).json({
      message: "Product purchased successfully",
      purchase,
    });
  } catch (error) {
    console.log("Buy Product Error:", error);
    return res.status(500).json({
      message: "Error purchasing product",
    });
  }
};
