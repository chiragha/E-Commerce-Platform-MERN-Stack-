import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      {/* Profile */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-gray-400">Welcome, Admin</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-3">
        <Link
          to="/admin/dashboard"
          className="block w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          Home
        </Link>

        <Link
          to="/admin/our-products"
          className="block w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          Our Products
        </Link>

        <Link
          to="/admin/create-product"
          className="block w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          Add Product
        </Link>

        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;