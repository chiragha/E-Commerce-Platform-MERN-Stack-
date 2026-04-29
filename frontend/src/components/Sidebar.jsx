import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/utils";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check token once when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Logout handled ONLY here
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in");
      navigate("/login");
      return;
    }

    try {
      await axios.get("${BACKEND_URL}/user/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setIsLoggedIn(false);

      toast.success("Logout successful 👋");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Profile</h2>

      <ul className="space-y-4 text-gray-700">
        <li onClick={() => navigate("/")} className="cursor-pointer hover:text-blue-600">
          🏠 Home
        </li>

        <li onClick={() => navigate("/products")} className="cursor-pointer hover:text-blue-600">
          🛍️ Products
        </li>

        <li onClick={() => navigate("/purchases")} className="cursor-pointer hover:text-blue-600">
          🛒 Purchases
        </li>

        <li onClick={() => navigate("/settings")} className="cursor-pointer hover:text-blue-600">
          ⚙️ Settings
        </li>

        {/* ✅ Dynamic Login / Logout */}
        {isLoggedIn ? (
          <li
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Logout
          </li>
        ) : (
          <li
            onClick={() => navigate("/login")}
            className="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 cursor-pointer"
          >
            Login
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;