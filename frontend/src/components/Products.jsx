import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { BACKEND_URL } from "../utils/utils";
import { toast } from "react-toastify";

import "swiper/css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // ✅ call backend logout
      await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });

      // ✅ clear frontend storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logout successful 👋");

      // ✅ reload to update UI
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/product/products`);
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Ensure minimum slides for loop
  const getDisplayProducts = () => {
    if (!products || products.length === 0) return [];

    if (products.length >= 3) return products;

    let repeated = [...products];

    while (repeated.length < 3) {
      repeated = [...repeated, ...products];
    }

    return repeated.slice(0, 3); // ✅ prevent too many duplicates
  };

  const displayProducts = getDisplayProducts();

 return (
  <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    {/* Background Blur Effects */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-[120px] opacity-20"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full blur-[120px] opacity-20"></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <span className="text-indigo-600 font-semibold uppercase tracking-widest text-sm">
            Trending Collection
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Discover our latest fashion collection.
          </p>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="group bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-indigo-300 transition-all duration-300 hover:scale-105"
        >
          Shop All
          <span className="inline-block ml-2 group-hover:translate-x-1 transition">
            →
          </span>
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {displayProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="group relative mb-8 rounded-[30px] overflow-hidden bg-white/70 backdrop-blur-lg border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                
                {/* Sale Badge */}
                <span className="absolute top-4 left-4 z-20 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-4 py-1 rounded-full shadow-md animate-pulse">
                  Trending
                </span>

                {/* Image Section */}
                <div className="relative h-72 bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      product.image?.url ||
                      product.image ||
                      "/no-image.png"
                    }
                    alt={product.title}
                    className="max-h-[85%] object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                    {product.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-5">
                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                      ₹{product.price}
                    </p>

                    <span className="text-sm text-green-600 font-medium">
                      In Stock
                    </span>
                  </div>

                  {/* Button */}
                  {product.stock < 1 ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-600 py-3 rounded-2xl font-medium cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <Link
                      to={`/buy/${product._id}`}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-indigo-300 hover:scale-[1.02] transition duration-300"
                    >
                      Buy Now →
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  </section>
);
};

export default Products;
