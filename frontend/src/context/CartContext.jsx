import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const token = localStorage.getItem("token");

  // GET CART FROM BACKEND
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items =
        res.data.cart?.items?.map((item) => ({
          _id: item.productId._id,
          title: item.productId.title,
          price: item.productId.price,
          image: item.productId.image,
          quantity: item.quantity,
        })) || [];

      setCartItems(items);
    } catch (err) {
      console.log("Cart fetch error", err);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  // ADD TO CART (BACKEND)
  const addToCart = async (product) => {
    try {
      await axios.post(
        `${BACKEND_URL}/cart/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
      setOpenCart(true);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE QTY
  const updateQuantity = async (id, type) => {
    try {
      await axios.put(
        `${BACKEND_URL}/cart/update`,
        {
          productId: id,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE ITEM
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/cart/remove`, {
        data: { productId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        openCart,
        setOpenCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);