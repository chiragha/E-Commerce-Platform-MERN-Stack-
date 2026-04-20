import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

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

  // ✅ Axios API call
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4001/api/v1/product/products",
      );

      // backend response handling
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
          <Sidebar />  


      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>

          <input
            type="text"
            placeholder="Search products..."
            className="border px-3 py-1 rounded-md"
          />
        </div>

        {/* STATES */}
        {loading && <p className="text-gray-600">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* PRODUCT GRID */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              >
                {/* IMAGE (SAFE FIX) */}
                <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                  <img
                    src={product.image?.url || product.image}
                    alt={product.title}
                    className="h-32 object-contain"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {product.description ||
                      "High quality product at best price."}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-gray-800">
                      ₹{product.price}
                    </span>

                    {product.oldPrice && (
                      <span className="line-through text-gray-400 text-sm">
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* BUTTON */}
                  <Link
                    to={`/buy/${product._id}`}
                    className="mt-4 block w-full text-center bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
