import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],

    paymentId: String,
    orderId: String,

    amount: Number,

    status: {
      type: String,
      default: "Paid",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);