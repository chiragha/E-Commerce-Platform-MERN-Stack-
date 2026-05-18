import React from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const CartDrawer = ({ open, setOpen }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-[400px] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center mt-20">
              <h3 className="font-semibold text-lg">Your cart is empty</h3>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 mb-5 border rounded-2xl p-3"
              >
                <img
                  src={item.image?.url || item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>

                  <p className="text-orange-500 font-bold">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQuantity(item._id, "dec")}>
                      <Minus size={18} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item._id, "inc")}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item._id)}>
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-5">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

         <button
  onClick={() => {
    if (
      cartItems.length === 0
    ) {
      toast.warning(
        "Cart is empty"
      );
      return;
    }

   navigate(
  `/checkout/${cartItems[0]._id}`,
  {
    state: {
      product: cartItems[0],
    },
  }
);
  }}
  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
>
  Checkout
</button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
