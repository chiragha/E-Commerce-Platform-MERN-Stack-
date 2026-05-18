import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BuyProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/product/${productId}`);
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

    if (!token) {
      toast.error("Please login first");

      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`${BACKEND_URL}/address/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const addresses = res.data.addresses;

      // NO ADDRESS
      if (addresses.length === 0) {
        toast.info("Please add address first");

        navigate(`/address/${productId}`);

        return;
      }

      // ADDRESS EXISTS
      navigate(`/checkout/${productId}`, {
        state: {
          product,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* LEFT - PRODUCT IMAGE */}
            <div className="bg-gray-100 rounded-2xl flex items-center justify-center p-8">
              <img
                src={product.image?.url}
                alt={product.title}
                className="w-full max-h-[450px] object-contain hover:scale-105 transition duration-300"
              />
            </div>

            {/* RIGHT - PRODUCT DETAILS */}
            <div className="flex flex-col justify-center">
              {/* Category Badge */}
              <span className="inline-block w-fit bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Premium Collection
              </span>

              {/* Product Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ₹{product.price}
                </span>

                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </span>
                )}

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  In Stock
                </span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-gray-700">
                  ✅ High Quality Material
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  🚚 Free Delivery Available
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  🔒 Secure Payment
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuy}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition duration-300 cursor-pointer"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="flex-1 border border-gray-300 hover:bg-gray-100 py-4 rounded-xl font-semibold text-lg transition duration-300 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyProduct;
