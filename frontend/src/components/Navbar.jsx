import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {BACKEND_URL} from "../utils/utils";


const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleLogout = async () => {
    try {
      // ✅ call backend logout
      await axios.get("${BACKEND_URL}/user/logout", {
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

  return (
    <nav className="w-full bg-[#fafafa] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 cursor-pointer">
         <Link to="/">E-Shop</Link>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
        </ul>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            // ✅ SHOW LOGOUT
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            // ❌ SHOW LOGIN/SIGNUP
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
