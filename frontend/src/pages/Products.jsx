import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_URL } from "../utils/utils";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [showFilters, setShowFilters] =
    useState(false);
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [maxPrice, setMaxPrice] = useState(4000);

  const navigate = useNavigate();

  // CART
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BACKEND_URL}/product/products`);

      const data = res.data.products || [];

      setProducts(data);
      setFilteredProducts(data);
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

  // FILTER LOGIC
  useEffect(() => {
    let filtered = [...products];

    // SEARCH
    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // BRAND
    if (selectedBrand) {
      filtered = filtered.filter((item) => item.brand === selectedBrand);
    }

    // CATEGORY
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // PRICE
    filtered = filtered.filter((item) => item.price <= maxPrice);

    setFilteredProducts(filtered);
  }, [search, selectedBrand, selectedCategory, maxPrice, products]);

  const brands = [...new Set(products.map((p) => p.brand))];

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen px-4 md:px-8 py-6">
        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Explore Products
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Discover premium products
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-[320px] border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            />

            {/* MOBILE FILTER BUTTON */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-orange-500 text-white px-5 py-3 rounded-xl"
            >
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* FILTER PANEL */}
          <div
            className={`
    ${showFilters ? "block" : "hidden"}
    lg:block
    lg:w-[280px]
    bg-white
    rounded-2xl
    shadow-md
    p-5
    h-fit
    lg:sticky
    top-24
  `}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Filters</h2>

              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-sm text-red-500"
              >
                Close
              </button>
            </div>

            {/* PRICE */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price</h3>

              <input
                type="range"
                min="0"
                max="4000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-orange-500"
              />

              <p className="text-sm text-gray-600 mt-1">Up to ₹{maxPrice}</p>
            </div>

            {/* BRAND */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Brand</h3>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option value="">All Brands</option>

                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* CATEGORY */}
            <div>
              <h3 className="font-semibold mb-2">Category</h3>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option value="">All Categories</option>

                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="flex-1">
            {loading && <p className="text-gray-500">Loading products...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group"
                  >
                    {/* IMAGE */}
                    <div className="bg-gray-100 h-[180px] sm:h-[220px] md:h-[250px] flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image?.url || product.image}
                        alt={product.title}
                        className="h-[200px] object-contain group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {product.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-800">
                          ₹{product.price}
                        </span>

                        {product.oldPrice && (
                          <span className="line-through text-gray-400">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>

                      {/* BUTTONS */}
                     <div className="flex flex-col sm:flex-row gap-3 mt-5">
                        {/* ADD TO CART */}
                        <button
                          onClick={() => {
                            const user = localStorage.getItem("user");

                            if (!user) {
                              toast.warning("Please login first");

                              navigate("/login");
                              return;
                            }

                            addToCart(product);

                            toast.success("Added to cart");
                          }}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition"
                        >
                          Add Cart
                        </button>

                        {/* BUY NOW */}
                        <button
                          onClick={() => {
                            const user = localStorage.getItem("user");

                            if (!user) {
                              toast.warning("Please login first");

                              navigate("/login");
                              return;
                            }

                            navigate(`/buy/${product._id}`);
                          }}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl hover:scale-[1.02] transition"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
