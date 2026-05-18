import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;

    const { productId } = req.body;

    let cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      });
    } else {
      const existing = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({
          productId,
          quantity: 1,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add cart",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.userId,
    }).populate("items.productId");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to remove item",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, type } = req.body;

    let cart = await Cart.findOne({ userId });

    // create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    let item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    // if item doesn't exist and user is increasing → ADD IT
    if (!item && type === "inc") {
      cart.items.push({
        productId,
        quantity: 1,
      });

      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Item added to cart",
        cart,
      });
    }

    if (!item) {
      return res.status(404).json({
        message: "Item not in cart",
      });
    }

    if (type === "inc") {
      item.quantity += 1;
    }

    if (type === "dec") {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          (i) => i.productId.toString() !== productId
        );
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update cart",
    });
  }
};