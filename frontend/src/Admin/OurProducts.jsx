import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
 const token = localStorage.getItem("token");

  useEffect(() => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login to admin");
    navigate("/admin/login");
  }
}, []);
  // ✅ FETCH PRODUCTS
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4001/api/v1/product/products"
      );

      console.log("Products:", res.data.products);

      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts(); // ✅ THIS LINE WAS MISSING
}, []);

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    const response = await axios.delete(
      `http://localhost:4001/api/v1/product/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.message);

    setProducts((prev) => prev.filter((p) => p._id !== id));

  } catch (error) {
    console.log("Delete error:", error.response?.data);
    toast.error(error.response?.data?.message || "Delete failed");
  }
};

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  return (
    <div className="flex">
      <AdminSidebar />
       <div className="bg-gray-100 p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      <Link
        className="bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300"
        to={"/admin/dashboard"}
      >
        Go to dashboard
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
            {/* product Image */}
            <img
              src={product?.image?.url}
              alt={product.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            {/* Course Title */}
            <h2 className="text-xl font-semibold mt-4 text-gray-800">
              {product.title}
            </h2>
            {/* product Description */}
            <p className="text-gray-600 mt-2 text-sm">
              {product.description.length > 200
                ? `${product.description.slice(0, 200)}...`
                : product.description}
            </p>
            {/* Course Price */}
            <div className="flex justify-between mt-4 text-gray-800 font-bold">
              <div>
                {" "}
                ₹{product.price}{" "}
                <span className="line-through text-gray-500">₹300</span>
              </div>
              <div className="text-green-600 text-sm mt-2">10 % off</div>
            </div>

            <div className="flex justify-between">
              <Link
                to={`/admin/update-products/${product._id}`}
                className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default OurProducts;
