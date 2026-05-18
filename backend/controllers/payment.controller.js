import crypto from "crypto";
import { razorpay } from "../utils/razorpay.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || amount < 1) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order",
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Order creation failed",
    });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }

    // ==========================
    // SAVE ORDER IN DATABASE
    // ==========================

    const userId = req.userId;

    // get cart
    const cart = await Cart.findOne({
      userId,
    }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // save order
    await Order.create({
      userId,

      products: cart.items.map((item) => ({
        productId: item.productId._id,

        quantity: item.quantity,
      })),

      paymentId: razorpay_payment_id,

      orderId: razorpay_order_id,

      amount: cart.items.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0,
      ),

      status: "Paid",
    });

    // clear cart after purchase
    cart.items = [];

    await cart.save();

    // ==========================

    return res.status(200).json({
      success: true,
      message: "Payment successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Verification failed",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
