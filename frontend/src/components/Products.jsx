import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";

const Products = () => {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // ✅ call backend logout
      await axios.get("http://localhost:4001/api/v1/user/logout", {
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
      const res = await axios.get(
        "http://localhost:4001/api/v1/product/products",
        { withCredentials: true },
      );

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
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-10">
  <h2 className="text-3xl font-bold text-gray-800">
    Featured Products
  </h2>

  <button
    onClick={() => navigate("/products")}
    className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
  >
    Shop All
  </button>
</div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={3}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {displayProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="group mb-8 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                {/* Image Section */}
                <div className="h-52 flex items-center justify-center bg-gray-100">
                  <img
                    src={product.image?.url || product.image || "/no-image.png"}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4 text-left">
                  {/* ✅ Product Name (clear & prominent) */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.title}
                  </h3>

                  {/* ✅ Description */}
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* ✅ Price */}
                  <p className="text-indigo-600 font-bold text-lg mb-3">
                    ₹{product.price}
                  </p>

                  {/* ✅ Button */}
                  {product.stock < 1 ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg text-sm cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <Link to={`/buy/${product._id}`} className="w-full bg-[#afc6e5] text-black py-2 rounded-lg text-sm font-medium hover:opacity-90 transition cursor-pointer">
                      Buy Now
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Products;
