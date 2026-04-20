import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BuyProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/api/v1/product/${productId}`,
        );
        setProduct(res.data.product);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  // 🔥 BUY FUNCTION
  const handleBuy = async () => {
    const token = localStorage.getItem("token");

    // 1. Check token
    if (!token) {
      toast.error("Please login first to buy product");
      navigate("/login");
      return;
    }

    try {
      // 2. Call backend buy API
     const res = await axios.post(
  `http://localhost:4001/api/v1/product/buy/${productId}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }
);

// ✅ Handle already purchased
if (res.data.alreadyPurchased) {
  toast.info("You already purchased this product");
} else {
  toast.success("Purchase successful!");
}
      // 3. Navigate after success
      navigate("/purchases");
    } catch (error) {
      console.log(error);
      toast.error("Purchase failed or unauthorized");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold">{product.title}</h1>

      <img
        src={product.image.url}
        alt={product.title}
        className="h-32 object-contain"
      />
      <p className="text-gray-600">{product.description}</p>

      <div className="mt-4 flex gap-3 items-center">
        <span className="text-xl font-bold">₹{product.price}</span>
        <span className="line-through text-gray-400">₹{product.oldPrice}</span>
      </div>

      {/* BUY BUTTON */}
      <button
        onClick={handleBuy}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Buy Now
      </button>
    </div>
  );
};

export default BuyProduct;
